/**
 * Created by Teerapat on 8/9/2017.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadTrends} from '../actions';
import {Doughnut} from 'react-chartjs-2';


var chartData = {
        labels: ["Publised Paper","Citation","Professor"],
        datasets: [{
            label: "Thammasat University",
                data: [
                2000,1040,130
            ],
            // backgroundColor: [
            // '#FF6384',
            // '#36A2EB',
            // '#FFCE56','#FF6384',
            // '#36A2EB',
            // '#FFCE56','#FF6384',
            // '#36A2EB',
            // '#FFCE56'
            // ],
            // hoverBackgroundColor: [
            // '#FF6384',
            // '#36A2EB',
            // '#FFCE56','#FF6384',
            // '#36A2EB',
            // '#FFCE56','#FF6384',
            // '#36A2EB',
            // '#FFCE56'
            // ],
            fill:true,
            yAxisID: "y-axis-1",
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

class Trends extends Component {

    constructor(props){
        super(props);
        this.state = {
            uni:'',
            fac:'',
            lng:''
        }

    }


    handleSelectMenu(obj){
        this.setState({...this.state,...obj});
        this.props.loadTrends({...this.state,...obj});
    }

    render() {

        const {trend} = this.props;
        console.log(trend.scatterData);
        if(trend.scatterData){
            const {ratio,ratioNames,ratioColors} = trend.scatterData;
            chartData.datasets[0]['data'] = ratio;
            chartData.labels = ratioNames;
            chartData.datasets[0].backgroundColor = ratioColors;
            chartData.datasets[0].hoverBackgroundColor = ratioColors;

        }
        const {publication,citation,researcher,citePerPub,uName} = trend.scatterData;

        return (
	<div className="container">
		<div className="vertnav">
            <div className="wrapper">
                <nav className="vertical">
                    <ul>
                        <li>
                            <label htmlFor="blog">University</label>
                            <input type="radio" name="verticalMenu" id="blog" />
                            <div>
                                <ul>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'cu'})}><a>CU</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'tu'})}><a>TU</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'ku'})}><a>KU</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'mu'})}><a>MU</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'kku'})}><a>KKU</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'uni':'pse'})} ><a>PSU</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="work">Faculty</label>
                            <input type="radio" name="verticalMenu" id="work" />
                            <div>
                                <ul>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'law'})}><a>Law</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'commerce'})}><a>Commerce and Accountancy</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'politics'})}><a>Political Science</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'eco'})}><a>Economics</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'siit'})}><a>Sirindhorn International Institute of Technology</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'soc'})}><a>Social Administration</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'libarts'})}><a>Liberal Arts</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'journal'})}><a>Journalism and Mass Communication</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'saa'})}><a>Sociology and Anthropology</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'sandt'})}><a>Science and Technology</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'engineer'})}><a>Engineering</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'medic'})}><a>Medicine</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'architect'})}><a>Architecture and Planning</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'ps'})}><a>Pharmaceutical Sciences</a></li>
                                    <li onClick={()=>this.handleSelectMenu({'fac':'learnsci'})}><a>Learning Sciences and Education</a></li>
                                </ul>
                            </div>
                        </li>

                        {this.state.fac}
                        {this.state.uni}
                    </ul>
                </nav>
			</div>
		</div>

        <div className="content">
			<div className="infobox row">
				<h1 className="topichead">{uName}</h1>
				<hr/>
			</div>



			<div id="overview" className="tab-pane fade in active">
					<div className="row">
                        <div className="col-md-3 rank">
                            <h3>Researchers</h3>
                            {researcher||0}
                        </div>
                        <div className="col-md-3 rank">
                            <h3>Publication</h3>
                            {publication||0}
                        </div>
                        <div className="col-md-3 rank">
                            <h3>Citation</h3>
                            {citation ||0}
                        </div>
                        <div className="col-md-3 rank">
                            <h3>Citation per Publication</h3>
                            {(citePerPub||0).toFixed(2)}
                        </div>

                    </div>

            </div>
                <div style={{height:'50%','display':'inline-block'}}>
                <h3>Published paper</h3>
                        <Doughnut data={chartData} width={300} height={300}/>
                </div>
        </div>
	</div>



        );
    }
}

function mapStateToProps(state){
    return {
        trend: state.trend
    };
}

export default connect(mapStateToProps,{loadTrends})(Trends);
