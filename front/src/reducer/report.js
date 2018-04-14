/**
 * Created by Teerapat on 8/9/2017.
 */


const init_state = {
    depList:[],
    dep:{
        count:[
            {
                name: 'Elsevier',
                values: [{x: 'PublishedPaper', y: 0}, {x: 'Citation', y: 0},{x:"Professor Number",y:0}]
            },

            {
                name: 'TCI',
                values: [{x: 'PublishedPaper', y: 0}, {x: 'Citation', y: 0},{x:"Professor Number",y:0}]
            }
        ],

        per:[
            {
                name: 'Elsevier',
                values: [{x: 'Citation/Profs', y: 0}, {x: 'Citation/Paper', y: 0}, {x: 'Paper/Profs', y: 0}]
            },
            {
                name: 'TCI',
                values: [{x: 'Citation/Profs', y: 0}, {x: 'Citation/Paper', y: 0}, {x: 'Paper/Profs', y: 0}]
            },
        ]
    },

    cite:[],
    paper:[],
    years:[],
    cpp:[]

}

export default function(state=init_state,action) {
    switch (action.type) {
        case "LOAD_DEPARTMENT":
            return {...state,depList:action.payload};
        case "LOAD_DEP":
            console.log(action.payload);
            const {citation,citationPerPaper,citationPerProf,paperPerProf,publishedPaper,professorNum} = action.payload;
            const newDep = {
                count:[
                    {
                        name: 'Elsevier',
                        values: [{x: 'PublishedPaper', y: publishedPaper[0]}, {x: 'Citation', y: citation[0]}, {x: 'Professor Number', y: professorNum[0]}]
                    },

                    {
                        name: 'TCI',
                        values: [{x: 'PublishedPaper', y: publishedPaper[1]}, {x: 'Citation', y: citation[1]}, {x: 'Professor Number', y: professorNum[1]}]
                    }
                ],

                per:[
                    {
                        name: 'Elsevier',
                        values: [{x: 'Citation/Profs', y: citationPerProf[0]}, {x: 'Citation/Paper', y: citationPerPaper[0]}, {x: 'Paper/Profs', y: paperPerProf[0]}]
                    },
                    {
                        name: 'TCI',
                        values: [{x: 'Citation/Profs', y: citationPerProf[1]}, {x: 'Citation/Paper', y: citationPerPaper[1]}, {x: 'Paper/Profs', y: citation[1]}]
                    },
                ]
            }
            return {...state,dep:newDep};
        case "LOAD_SI":
            console.log(action.payload);

            return {...state,...action.payload}
    }
    return state;
}