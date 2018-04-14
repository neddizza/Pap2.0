/**
 * Created by Teerapat on 8/10/2017.
 */


import React, {Component} from 'react';
import WordCloud from 'react-d3-cloud';
import {connect} from 'react-redux';
import {loadTrendsCloud} from '../actions';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


var maxSize = 100;
var minSize = 20;
const fontSizeMapper = (word,maxValue) => {
    var currentFontSize = (word.value/maxValue)*maxSize;
    if(currentFontSize<minSize){
        currentFontSize = minSize;
    }
    return currentFontSize;
};
//Math.log2(word.value) * 8
const rotate = word => 0;

class Trends_cloud extends Component {

    constructor(props){
        super(props);
        this.state = {
            type:'budg',
            year:[2,10],
            yearOne:0,
            lng:'all',

        }
    }

    componentDidMount(){
        this.props.loadTrendsCloud({type:'budg'});
    }


    handleChange(year){

        this.setState({ year });
        this.props.loadTrendsCloud({...this.state,min:year[0],max:year[1]});
    }


    handleLngChange(lng){
        this.props.loadTrendsCloud({...this.state,lng:lng});
    }

    render() {
        const {cloud,years,maxValue} = this.props;
        var yearList = {};
        if(years!=null)
            for(var i=years.min;i<=years.max;i++){
                yearList[i] = i;
            }
        return (
            <div>
                <select className="form-control" value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value}); this.props.loadTrendsCloud({type:e.target.value});}}>
                    <option value="budg">Budget Plan</option>
                    <option value="thes">Thesis</option>
                    <option value="publi">Publication</option>
                    <option value="tubudg">TU Budget Plan</option>
                    <option value="turac">TU RAC</option>
                </select>

                <select className="form-control" value={this.state.lng} onChange={(e)=>{this.setState({lng:e.target.value}); this.handleLngChange(e.target.value);}}>
                    <option value="all">All</option>
                    <option value="eng">English</option>
                    <option value="th">Thai</option>
                </select>


                <WordCloud
                    data={cloud}
                    fontSizeMapper={(word)=>fontSizeMapper(word,maxValue)}
                    rotate={rotate}
                />
                Min: {this.state.year[0]}
                Max: {this.state.year[1]}


                <Range
                    {...years}
                    onChange={this.handleChange.bind(this)}
                    value={this.state.year}
                    marks={yearList}
                    tipFormatter={value => `${value}%`}
                />



            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        cloud:state.trend.cloud,
        years:state.trend.years,
        maxValue:state.trend.maxValue,
    }
}

export default connect(mapStateToProps,{loadTrendsCloud})(Trends_cloud);
