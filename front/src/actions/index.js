/**
 * Created by Teerapat on 8/9/2017.
 */

import axios from 'axios';
import {ROOT_URL,BACK_URL} from '../config';


export function loadPapers({q,field,page,sort,since}){
    return function(dispatch){
        axios.get(`${BACK_URL}/api/paper`, {
            params:{
                q,field,page,sort,since
            }
        })
            .then((res)=>{
                console.log(res);
                dispatch({
                    type:"LOAD_PAPER",
                    payload:res.data
                })
            })
            .catch((err)=>console.log(err));
    }
}

export function clearPaper(){
    return function(dispatch){
                 dispatch({
                    type:"LOAD_PAPER",
                    payload:{result:[],lastPage:0}
                })
        }
}

export function loadTUPapers({q,field,page}){
      return function(dispatch){
        axios.get(`${BACK_URL}/api/tupaper`, {
            params:{
                q,field,page
            }
        })
            .then((res)=>{
                console.log(res);
                dispatch({
                    type:"LOAD_PAPER",
                    payload:res.data
                })
            })
            .catch((err)=>console.log(err));
    }
}

export function loadDepartmentList(){
    return function(dispatch){
        axios.get(`${BACK_URL}/api/departmentList`)
            .then((res)=>{
                console.log(res);
                dispatch({
                    type:"LOAD_DEPARTMENT",
                    payload:res.data.results
                })
            })
    }
}

export function loadDepartment(depName){
    return function(dispatch){
        axios.get(`${BACK_URL}/api/getDepInfo/`+depName)
            .then((res)=>{
                dispatch({
                    type:"LOAD_DEP",
                    payload:res.data
                })
            })
    }

}

export function loadProfList(){
    return function(dispatch){
        axios.get(`${BACK_URL}/api/profList`)
            .then((res)=>{
                console.log(res);
                dispatch({
                    type:"LOAD_DEPARTMENT",
                    payload:res.data.results
                })
            })
    }
}

export function loadReportSI(profName){
    return function(dispatch){
        axios.get(`${BACK_URL}/api/report`,
            {
            params:{profName}
        })
            .then((res)=>{
                dispatch({
                    type:"LOAD_SI",
                    payload:res.data
                })
            })
    }

}



export function loadTrends(tren){
    console.log(tren);
    return function(dispatch){
        axios.get(`${BACK_URL}/api/overview`,{
            params:tren
        })
            .then((res)=>{
                console.log(res);
                dispatch({
                    type:"LOAD_TREND",
                    payload:res.data
                })

            })

    }
}


export function loadTrendsCloud(query){
    return function(dispatch){

        dispatch({
            type:"LOAD_CLOUD",
            payload:{cloud:[{text:"LOADING..",value:1000}]}
        });

        axios.get(`${BACK_URL}/api/trendscloud`,{
            params:query
        })
            .then((res)=>{
                dispatch({
                    type:"LOAD_CLOUD",
                    payload:res.data
                })
            })
            .catch((err)=>console.log(err))

    }
}

export function loadCrawledTrendsCloud(query){
    console.log(query);
    return function(dispatch){

        dispatch({
            type:"LOAD_CLOUD",
            payload:{cloud:[{text:"LOADING..",value:1000}]}
        });

        axios.get(`${BACK_URL}/api/crawledtrendscloud`,{
            params:query
        })
            .then((res)=>{
                dispatch({
                    type:"LOAD_CLOUD",
                    payload:res.data
                })
            })
            .catch((err)=>console.log(err))

    }
}