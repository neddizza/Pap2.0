/**
 * Created by Teerapat on 8/9/2017.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadProfList,loadReportSI} from '../actions'
import {Bar,Line} from 'react-chartjs-2';

const data = {
  labels: ["Publised Paper","Citation","Professor"],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0,0,0]
    }
  ]
};

//# 32 A6 BD
//e9 71 1c


var paperData = {
        labels: [1985,1990,1995,2000,2005,2010,2015],
        datasets: [{
             label: "Google Scholar",
            backgroundColor: 'rgba(51,105,232,0.4)',
          borderColor: 'rgba(51,105,242,0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(51,105,232,0.6)',
          hoverBorderColor: 'rgba(51,105,242,0.4)',
            data: [
                10,20,45,10,2,39,19
            ],
        }]
    };

var citeData = {
        labels: [1985,1990,1995,2000,2005,2010,2015],
        datasets: [{
             label: "Google Scholar",
            backgroundColor: 'rgba(0,153,37,0.4)',
          borderColor: 'rgba(0,153,37,0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0,153,37,0.6)',
          hoverBorderColor: 'rgba(0,153,37,0.4)',
            data: [
                10,20,45,10,2,39,19
            ],
        }]
    };

var citePerPaperData = {
        labels: [1985,1990,1995,2000,2005,2010,2015],
        datasets: [{
             label: "Google Scholar",
            backgroundColor: 'rgba(233,178,28,0.4)',
          borderColor: 'rgba(240,178,32,0.0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(243,178,28,0.6)',
          hoverBorderColor: 'rgba(250,178,40,0.5)',
            data: [
                10,20,45,10,2,39,19
            ],
        }]
    };


class Report extends Component {

    constructor(props){
        super(props);
        this.state ={
            dep:'Virach Sornlertlamvanich',
        }
    }

    componentDidMount(){
        this.props.loadProfList();
        this.props.loadReportSI("Virach Sornlertlamvanich");
    }

    render() {

        const {depList,cite,paper,cpp,years} = this.props.report;
        console.log(years);


        paperData.datasets[0]['data'] = paper;
        paperData.labels = years;

        citeData.datasets[0]['data'] = cite;
        citeData.labels = years;

        citePerPaperData.datasets[0]['data'] = cpp;
        citePerPaperData.labels = years;


        // console.log(perChartData);
        // console.log("PRINTED");
        return (

            <div className="container">
                <div className="row">
                    {/*<div className="pull-right col-md-2">*/}
                        {/*<select className="form-control">*/}
                            {/*<option>ปี</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}


                    <div className="pull-right col-md-2">
                        <select className="form-control" value={this.state.dep} onChange={(e)=>{console.log(e.target.value); this.setState({dep:e.target.value}); this.props.loadReportSI(e.target.value); }}>
                            {depList.length>0?
                                depList.map((dep,index)=><option key={index} value={dep}>{dep}</option>)
                                :<option>ชื่อ</option>}
                        </select>
                    </div>
                </div>
                <hr/>
                {/*<select id="reportstat" className="form-control" >*/}
                    {/*<option value="pubpap">Published paper report</option>*/}
                    {/*<option value="pubperres">Published paper per Researcher's report</option>*/}
                    {/*<option value="cit">Citation</option>*/}
                    {/*<option value="citperpap">Citation per report paper</option>*/}
                    {/*<option value="citperres">Citation per researcher</option>*/}
                {/*</select>*/}


                <div style={{'marginLeft':'100px'}}>
                    <h3>{this.state.dep}</h3>

                    {/*<BarChart2 data={chartData} options={chartOptions} width="600" height="250"/>*/}
                    {/*<BarChart2 data={perChartData} options={perChartOptions} width="600" height="250"/>*/}

                    <div style={{width:'50%','display':'inline-block'}}>
              <Line
          data={paperData}
          width={400}
          height={200}
          options={{
              title: {
                  display: true,
                  text: 'Published Paper per year'
              }
          }
          }
        />

                    </div>
<div style={{width:'50%','display':'inline-block'}}>
                    <Line
          data={citeData}
          width={400}
          height={200}
          options={{
              title: {
                  display: true,
                  text: 'Citation per year'
              }
          }
          }
        />
</div>

                    <Line
          data={citePerPaperData}
          width={600}
          height={200}
          options={{
              title: {
                  display: true,
                  text: 'Citation/Paper per year'
              }
          }
          }
        />




                </div>

                <br/>
                <br/>

            </div>

        );
    }
}
function mapStateToProps(state){
    return {
        report: state.report,
    };
}


export default connect(mapStateToProps,{loadProfList,loadReportSI})(Report);
