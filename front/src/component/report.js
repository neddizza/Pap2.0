/**
 * Created by Teerapat on 8/9/2017.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadDepartmentList,loadDepartment} from '../actions'
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ["Publised Paper","Citation","Faculty"],
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

var chartData = {
        labels: ["Publised Paper","Citation","Faculty"],
        datasets: [{
            label: "Elsevier",
            backgroundColor: 'rgba(233,113,28,0.4)',
          borderColor: 'rgba(240,117,32,0.0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(243,113,28,0.6)',
          hoverBorderColor: 'rgba(250,120,40,0.5)',
            data: [
                10,10,10
            ],
        }, {
            label: "TCI",
            backgroundColor: 'rgba(50,166,189,0.4)',
              borderColor: 'rgba(100,100,100,0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(50,200,195,0.6)',
              hoverBorderColor: 'rgba(100,100,100,0.5)',
            data: [
                10,10,10
            ],
        }]
    };

var perChartData = {
        labels: ["Citation/Profs","Citation/Paper","Paper/Profs"],
        datasets: [{
             label: "Elsevier",
            backgroundColor: 'rgba(233,113,28,0.4)',
          borderColor: 'rgba(240,117,32,0.0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(243,113,28,0.6)',
          hoverBorderColor: 'rgba(250,120,40,0.5)',
            data: [
                10,10,10
            ],
        }, {
         label: "TCI",
            backgroundColor: 'rgba(50,166,189,0.4)',
              borderColor: 'rgba(100,100,100,0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(50,200,195,0.6)',
              hoverBorderColor: 'rgba(100,100,100,0.5)',
            data: [
                10,10,10
            ]
        }]
    };

const chartOptions = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
    }
}


const perChartOptions = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
    }
}
class Report extends Component {

    constructor(props){
        super(props);
        this.state ={
            dep:'',
        }
    }

    componentDidMount(){
        this.props.loadDepartmentList();
        this.props.loadDepartment("คณะวิทยาศาสตร์และเทคโนโลยี");
    }

    render() {

        const {depList,dep} = this.props.report;
        console.log(dep);


        chartData.datasets[0]['data'] = [dep.count[0].values[0].y, dep.count[0].values[1].y, dep.count[0].values[2].y];
        chartData.datasets[1]['data'] = [dep.count[1].values[0].y, dep.count[1].values[1].y, dep.count[1].values[2].y];

        perChartData.datasets[0]['data'] = [dep.per[0].values[0].y, dep.per[0].values[1].y, dep.per[0].values[2].y];
        perChartData.datasets[1]['data'] = [dep.per[1].values[0].y, dep.per[1].values[1].y, dep.per[1].values[2].y];


        console.log(perChartData);
        console.log("PRINTED");
        return (

            <div className="container">
                <div className="row">
                    {/*<div className="pull-right col-md-2">*/}
                        {/*<select className="form-control">*/}
                            {/*<option>ปี</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}

                    <div className="pull-right col-md-2">
                        <select className="form-control" value={this.state.dep} onChange={(e)=>{console.log(e.target.value); this.setState({dep:e.target.value}); this.props.loadDepartment(e.target.value); }}>
                            {depList.length>0?
                                depList.map((dep,index)=><option key={index} value={dep}>{dep}</option>)
                                :<option>คณะ</option>}
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

                    {/*<BarChart2 data={chartData} options={chartOptions} width="600" height="250"/>*/}
                    {/*<BarChart2 data={perChartData} options={perChartOptions} width="600" height="250"/>*/}

                    <div style={{'width':'50%','display':'inline-block'}}>
                   <Bar
          data={chartData}
          width={600}
          height={400}

        />

                    </div>

                    <div style={{'width':'50%','display':'inline-block'}}>
                         <Bar
          data={perChartData}
          width={600}
          height={400}
        />
            </div>



                </div>

                <br/>
                <br/>

            </div>

        );
    }
}
function mapStateToProps(state){
    return {
        report: state.report
    };
}


export default connect(mapStateToProps,{loadDepartmentList,loadDepartment})(Report);
