/**
 * Created by Teerapat on 9/8/2560.
 */



const init_state = {
    lastPage:0,
    result:[],
    scatterData:[],
    cloud:[],
    maxValue:10,
    years:null

}

export default function(state=init_state,action) {
    switch (action.type) {
        case "LOAD_TREND":
            return {...state,scatterData:action.payload};
        case "LOAD_CLOUD":
            //console.log(Math.max.apply(Math,action.payload.cloud.map(function(o){return o.value;})));
            const {cloud} = action.payload;
            return {...state,...action.payload,maxValue:cloud[0].value}
    }
    return state;
}