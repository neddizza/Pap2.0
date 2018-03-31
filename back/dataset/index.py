#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jul 14 15:13:42 2017
@author: essz
"""



from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import re
import numpy as np
import math
import random
from collections import Counter

eng_alpha = list('abcdefghijklmnopqrstuvwxyz')
thai_alpha = list('ก,ข,ฃ,ค,ฅ,ฆ,ง,จ,ฉ,ช,ซ,ฌ,ญ,ฎ,ฏ,ฐ,ฑ,ฒ,ณ,ด,ต,ถ,ท,ธ,น,บ,ป,ผ,ฝ,พ,ฟ,ภ,ม,ย,ร,ฤ,ล,ฦ,ว,ศ,ษ,ส,ห,ฬ,อ,ฮ,ฯ,ะ,ั,า,ำ,ิ,ี,ึ,ื,ุ,ู,ฺ,฻,฼,฽,฾,฿,เ,แ,โ,ใ,ไ,ๅ,ๆ,็,่,้,๊,๋,์,ํ,๎,๏,๐,๑,๒,๓,๔,๕,๖,๗,๘,๙')
maxYear = 2020

def getYear(jrn_year_src):
    match = re.search('\d{4}',jrn_year_src)
    return match.group(0) if match else 'None'



elsprof = pd.read_csv('./dataset/final_elsapyProfPro.tsv',sep='\t',encoding='utf-8')
allprof = pd.read_csv('./dataset/final_allProfPro.tsv',sep='\t',encoding='utf-8')
tciprof = pd.read_csv('./dataset/final_tciProfPro.tsv',sep='\t',encoding='utf-8')
paper_df = pd.read_csv("./dataset/paper_content.csv",encoding='utf-8').reset_index()
paper_df['abstracts'] = paper_df['abstracts'].apply(lambda x:str(x).replace("\\n",""))
paper_df['department'] = 'SIIT';
paper_df['pdfUrls'] = paper_df['pdfUrls'].fillna('None')
paper_df['abstracts'] = paper_df['abstracts'].fillna('None')
paper_df['tokenized_content'] = paper_df['content'].apply(lambda x: str(x).split())
paper_df['citedBys'] = paper_df['citedBys'].convert_objects(convert_numeric=True).fillna(0)

siit_info = pd.read_csv('./dataset/SIIT_staff.csv')
def cleanName(name):
    words = name.split(" ")
    if(len(words)>2):
        return words[1]+" "+words[2]
    else:
        return "not found"
siit_info['cleaned_name'] = siit_info['name'].apply(cleanName)


with open('./dataset/stopword_eng.txt') as f:
    lines = f.readlines()
eng_stopwords = [line.replace("\n","") for line in lines]



#New data from TU
thesis = pd.read_csv("./dataset/new/tbl_thesis-20170802213932.tsv",sep='\t')
thesis['tokenized_title'] = thesis['tokenized_title'].apply(lambda x:eval(x))

publication = pd.read_csv("./dataset/new/tbl_publication-20150407094419.tsv",sep='\t')
publication['tokenized_title'] = publication['tokenized_title'].apply(lambda x:eval(x))
publication['year'] = publication['year'].convert_objects(convert_numeric=True)


tubudget = pd.read_csv("./dataset/new/tbl_tu_budget_project-20150407094255.tsv",sep='\t')
tubudget['tokenized_title'] = tubudget['tokenized_title'].apply(lambda x:eval(x))

turac = pd.read_csv("./dataset/new/tbl_turac_project-20150407094237.tsv",sep='\t')
turac['tokenized_title'] = turac['tokenized_title'].apply(lambda x:eval(x))


budget =  pd.read_csv("./dataset/new/tbl_government_budget_project-20160425100027.tsv",sep='\t')
budget['tokenized_title'] = budget['tokenized_title'].apply(lambda x:eval(x))

from sklearn import preprocessing
le = preprocessing.LabelEncoder()
paper_df['Professor_Id'] = le.fit_transform(paper_df['Professor_Name'])
paper_df['authors'] = paper_df['journal_year_srces'].apply(lambda x: x.split("-")[0])

page_size = 20


paper_df['year'] = paper_df['journal_year_srces'].apply(getYear)

app = Flask(__name__)
app.config["APPLICATION_ROOT"] = "/pap"

cors = CORS(app)

#    return render_template('home.html')
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('home.html')




@app.route('/api/report', methods=['GET'])
@cross_origin()
def apiapi():
    profName  = request.args.get('profName') or "Virach Sornlertlamvanich"
    print(profName)
    selectedDf = paper_df[paper_df['Professor_Name'] == profName]

    print(selectedDf.shape)
    selectedDf = selectedDf[(pd.to_numeric(selectedDf['year'], errors='coerce') >= int(1950)) & (pd.to_numeric(selectedDf['year'], errors='coerce') <= 2018)]

    paperCount = selectedDf['year'].value_counts().sort_index()
    citeCount = selectedDf.groupby('year')['citedBys'].sum()
    print("Before returning")
    # jsonify will do for us all the work, returning the
    # previous data structure in JSON
    return jsonify({
        "years":paperCount.index.tolist(),
        "paper":paperCount.values.tolist(),
        "cite":citeCount.values.tolist(),
        'cpp':(citeCount/paperCount).values.tolist()
    })


@app.route('/api/departmentList' ,methods=['GET'])
@cross_origin()
def getDep():
    return jsonify(results=list(allprof['DepartmentTH'].unique()))

@app.route('/api/profList' ,methods=['GET'])
@cross_origin()
def getProf():
    return jsonify(results=list(paper_df['Professor_Name'].unique()))


@app.route('/api/professor/<path:path>', methods=['GET'])
@cross_origin()
def getProfInfo(path):
    print(path)
    selectdf = paper_df[paper_df['Professor_Id'] == int(path)]
    prof_info = siit_info[siit_info['name'].apply(lambda x: selectdf['Professor Name'].iloc[0] in x)]
    dic = {
        "papers": list([list(x) for x in selectdf[['titles', 'authors']].values]),
        "ranking": 4,
        "publication": selectdf.shape[0],
        "citation": 19,
        "citePerPub": 19/selectdf.shape[0],
        "prof":prof_info['email']
    }
    return jsonify(dic)

@app.route('/api/tupaper',methods=['GET'])
@cross_origin()
def getTUPapers():
    page = request.args.get('page')
    q = request.args.get('q')
    field = request.args.get('field')


    if page is None or page == "":
        page = 1
    if (field is None or field == ""):
        field = 'Title'

    if (q is not None and q != ""):
        if (field == 'Author'):
            selectCond = thesis['author'].apply(lambda x: q in x)
            print(selectCond.sum())
        elif (field == 'Title'):
            selectCond = thesis['title'].apply(lambda x: q in x)
        elif (field == 'Faculty'):
            selectCond = thesis['department'].apply(lambda x: q in x)

        selectedDf = thesis[selectCond]
    else:
        selectCond = thesis['title'] != 'do not match with this string'

        selectedDf = thesis
    page = int(page)


    paperList = list([list(i) for i in selectedDf[['id', 'title', 'author', 'department', 'year', 'author']][
                                       (page - 1) * page_size:(page) * page_size].values])
    return jsonify({
        "size": int(selectCond.sum()),
        "page": page,
        "lastPage": math.ceil((selectCond.sum()) / page_size),
        "result": paperList
    })


@app.route('/api/paper',methods=['GET'])
@cross_origin()
def getPapers():
    page = request.args.get('page')
    q = request.args.get('q')
    field = request.args.get('field')
    if page is None or page=="":
        page = 1
    if(field is None or field==""):
        field = 'Title'

    selectedDf = paper_df


    sort = request.args.get('sort') or "None"
    since = request.args.get('since') or 1900

    print(sort)
    print(since)


    if(q is not None and q !=""):
        if(field=='Author'):
            selectCond = selectedDf['Professor_Name'].apply(lambda x: q in x)
            print(selectCond.sum())
        elif(field=='Title'):
            selectCond = selectedDf['titles'].apply(lambda x:q in x)
        elif(field=='Faculty'):
            selectCond = selectedDf['department'].apply(lambda x:q in x)

        selectedDf = selectedDf[selectCond]
    else:
        selectCond = selectedDf['titles']!='do not match with this string'

    if (since is not "None"):
        selectedDf = selectedDf[(pd.to_numeric(paper_df['year'], errors='coerce') >= int(since)) & (pd.to_numeric(paper_df['year'], errors='coerce') <= maxYear)]

    if (sort is not "None"):
        selectedDf = selectedDf.sort_values(sort,ascending=False)

    page = int(page)
    paperList = list([list(i) for i in selectedDf[['Unnamed: 0','titles','journal_year_srces','department','year','Professor_Name','abstracts','citedBys','pdfUrls']][(page-1)*page_size:(page)*page_size].values])
    return jsonify({
                    "size":int(selectCond.sum()),
                    "page":page,
                    "lastPage":math.ceil((selectCond.sum())/page_size),
                    "result":paperList
                    })



facDict = {
    'ce':'School of Civil Engineering and Technology (CET)',
    'bio':'School of Bio-Chemical Engineering and Technology (BCET)',
    'mt':'School of Management Technology (MT)',
    'ict':'School of Information, Computer, and Communication Technology  (ICT)',
    'msme':'School of Manufacturing Systems and Mechanical Engineering (MSME)'
}

@app.route('/api/overview',methods=['GET'])
@cross_origin()
def trendsCloud():

    selected_df = paper_df

    fac = request.args.get('fac') or "None"
    lng = request.args.get('lng') or "all"
    uni = request.args.get('uni') or "None"
    #Tobe cont on year


    if(uni=='tu' and fac=='siit'):
        print("TU hel lyeah")

    dict_Uni = {
        'cu':'Chulalongkorn University',
        'tu':'Thammasat University',
        'ku':"Kasetsart University",
        'mu':"Mahidol University",
        'kku':"Khon Kaen University",
        'psu':"Prince of Songkla University",
        'None':''
    }


    #Random everything because too little data. T T
    uName = dict_Uni[uni]
    publication = random.randint(100,500)
    citation = random.randint(300,700)
    researchers = random.randint(10,80)
    citePerPub = researchers/publication

    randNum = random.randint(3,7)
    ratio = [random.randrange(1,101,1) for _ in range (randNum)]
    ratioNames = ["Faculty %d"%i for i in range(randNum)]

    r = lambda: random.randint(0, 255)
    ratioColors = ['#%02X%02X%02X' % (r(), r(), r()) for i in range(randNum)]
    print("Random pls")
    print(ratioColors)
    return jsonify(
        {
            "uName":uName,
            "publication":publication,
            "citation":citation,
            "researcher":researchers,
            "citePerPub":citePerPub,
            "ratio":ratio,
            "ratioNames":ratioNames,
            "ratioColors":ratioColors,
        }
    )


    return words


@app.route('/api/trendscloud',methods=['GET'])
@cross_origin()
def getTrendsCloud():
    yearsDic = {
        'budg':{"min":2552,"max":2558},
        'thes':{"min":2496,"max":2539},
        'publi':{"min":2550,"max":2556},
        'tubudg':{"min":2551,"max":2556},
        'turac':{"min":2550,"max":2556},
    }
    dfDic = {
        'budg':budget,
        'thes':thesis,
        'publi':publication,
        'tubudg':tubudget,
        'turac':turac,
    }
    type = request.args.get('type') or "budg"
    lng = request.args.get('lng') or "all"
    minYear = request.args.get('min') or "None"
    maxYear = request.args.get('max') or "None"
    year = request.args.get('year') or "None"

    selectedDf = dfDic[type]
    """
    if(type=='budg'):
        selectedDf = budget
    else:
        selectedDf = thesis
    """
    print("called")
    if(year is not "None"):
        selectedDf = selectedDf[(pd.to_numeric(selectedDf['year'], errors='coerce')==int(year))]
    elif(minYear is not "None" and maxYear is not "None"):
            selectedDf = selectedDf[(pd.to_numeric(selectedDf['year'], errors='coerce')>=int(minYear))&(pd.to_numeric(selectedDf['year'], errors='coerce')<=int(maxYear))]
    stopwords = [' ','การ','-','1','3',')',':','เพื่อ','ผู้','[','(','ได้','ด้าน','ต่อ','และ','โดย','กรณี','ต้น','ระหว่าง','2','.','?','/','.']
    words = [word for title in selectedDf['tokenized_title'].values for word in title if word not in stopwords]

    if(lng=='eng'):
        words = [word for word in words if any(eng_letter in word for eng_letter in eng_alpha)]
    elif(lng=='th'):
        words = [word for word in words if any(thai_letter in word for thai_letter in thai_alpha)]
    counts = Counter(words)
    return jsonify({"cloud":[{"text":text,"value":val} for (text,val) in counts.most_common(75)],"years":yearsDic[type]})



@app.route('/api/crawledtrendscloud',methods=['GET'])
@cross_origin()
def getcrawledtrendscloud():
    print("HELLO")
    type = request.args.get('type') or "None"
    lng = request.args.get('lng') or "all"
    minYear = request.args.get('min') or "None"
    maxYear = request.args.get('max') or "None"
    year = request.args.get('year') or "None"

    selectedDf = paper_df

    print("called")
    if (year is not "None"):
        selectedDf = selectedDf[(pd.to_numeric(selectedDf['year'], errors='coerce') == int(year))]
    elif (minYear is not "None" and maxYear is not "None"):
        selectedDf = selectedDf[(pd.to_numeric(selectedDf['year'], errors='coerce') >= int(minYear)) & (
        pd.to_numeric(selectedDf['year'], errors='coerce') <= int(maxYear))]

    if(type is not "None"):
        selectedDf = selectedDf[selectedDf['Professor_Name'] == type]


    words = [word for title in selectedDf['titles'].apply(lambda x: x.split(" ")).values for word in title if word not in eng_stopwords]
    #Min max is 1985- 2017


    counts = Counter(words)
    return jsonify(
        {"cloud": [{"text": text, "value": val} for (text, val) in counts.most_common(75)], "years": {"min":1985,"max":2017}})



@app.route('/api/trends',methods=['GET'])
@cross_origin()
def getTrends():
    fac = request.args.get('fac')
    uni = request.args.get('uni')

    numPoint = 100
    points = [{"x":random.randint(1,100),"y":random.randint(1,100)} for i in range(numPoint)]

    dicts = [{
        "name":"series",
        "values":points
    }]

    return jsonify(dicts)

@app.route('/api/getDepInfo/<path:path>',methods=['GET'])
@cross_origin()
def getDepInto(path):
    #tciprof
    infos = {
        "name":path,
        "source": [],
        "publishedPaper": [],
        "paperPerProf": [],
        "citation": [],
        "citationPerPaper": [],
        "citationPerProf": [],
        "professorNum":[],
        "researcharea": ["Topic1", "Topic2", "Topic3"]
    }
    for df,name in [(elsprof,"Elsevier"),(tciprof,"TCI")]:
        depProf = df[df['DepartmentTH']==path]
        if(depProf.shape[0]==0):return "Not Found"
        publishedPaper = depProf['doc_count'].sum()
        paperPerProf = publishedPaper/depProf.shape[0]
        citation = depProf['cited_by_count'].sum()
        if(publishedPaper==0):citePerpaper = 0
        else: citePerpaper = citation/publishedPaper

        citePerProf = citation/depProf.shape[0]
        prof = depProf.shape[0]



        infos['source'].append(name)
        infos['publishedPaper'].append(int(publishedPaper))
        infos['paperPerProf'].append(float(paperPerProf))
        infos['citation'].append(int(citation))
        infos['citationPerPaper'].append(float(citePerpaper))
        infos['citationPerProf'].append(float(citePerProf))
        infos['professorNum'].append(int(prof))

    return jsonify(infos)


@app.route('/api/graph')
@cross_origin()
def api_graph():
    return jsonify({"x":[2014,2015,2016,2017],"y":[494,1500,651,300],"graphName":"Published Paper (Demo)"})


@app.route('/<path:path>')
@cross_origin()
def catch_all(path):
    try:
        return render_template(path)
    except Exception:
        return jsonify(["NOT FOUND"])



if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, port=5001)
