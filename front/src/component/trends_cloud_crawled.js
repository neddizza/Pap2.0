/**
 * Created by Teerapat on 8/10/2017.
 */


import React, {Component} from 'react';
import WordCloud from 'react-d3-cloud';
import {connect} from 'react-redux';
import {loadCrawledTrendsCloud} from '../actions';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

var maxSize = 80;
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

const profNames = ['Virach Sornlertlamvanich', 'Thanaruk Theeramunkong',
       'Bunyarit Uyyanonvara', 'Boontawee Suntisrivaraporn',
       'Cholwich Nattee', 'Gun Srijuntongsiri', 'Komwut Wipusitwarakun',
       'Banlue Srisuchinwong', 'Chalie Charoenlarpnopparut',
       'Ekawit Nantajeewarawat', 'Itthisek Nilkhamhang', 'Nguyen Duy Hung',
       'Nirattaya Khamsemanan', 'Pakinee Aimmanee', 'Prapun Suksompong',
       'Sasiporn Usanavasin', 'Somsak Kittipiyakul',
       'Stanislav S. Makhanov', 'Teerayut Horanont', 'Toshiaki Kondo',
       'Waree Kongprawechnon', 'Bhanupong  Nidhiprabha',
       'Chaiwat  Satha-anand', 'Sunjai  Klindao',
       'Siriluck  Rotchanakitumnuai', 'Supeecha  Panichpathom',
       'Kasian  Tejapira', 'Watchaneeporn  Setthasakko',
       'Rutchana  Tainsri', 'Pavadee  Sompagdee', 'Kamon  Budsaba',
       'Thanes  Wongyannava', 'Anya  Khanthavit'];

class Trends_cloud_crawled extends Component {

    constructor(props){
        super(props);
        this.state = {
            type:profNames[0],
            year:[1985,2017],
            yearOne:0,
            lng:'all',

        }
    }

    componentDidMount(){
        this.props.loadCrawledTrendsCloud({type:profNames[0]});
    }


    handleChange(year){

        this.setState({ year });
        this.props.loadCrawledTrendsCloud({...this.state,min:year[0],max:year[1]});
    }


    handleLngChange(lng){
        this.props.loadCrawledTrendsCloud({...this.state,lng:lng});
    }

    render() {
        const {cloud,years,maxValue} = this.props;
        var yearList = {};
        if(years!=null)
            for(var i=years.min;i<=years.max;i++){
                yearList[i] = i;
            }
        const {year} = this.state;
        console.log(cloud);
        return (
            <div>
                <select className="form-control" value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value}); this.props.loadCrawledTrendsCloud({type:e.target.value,min:year[0],max:year[1]});}}>
                    {profNames.map((name,index)=><option value={name}>{name}</option>)}
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

export default connect(mapStateToProps,{loadCrawledTrendsCloud})(Trends_cloud_crawled);
