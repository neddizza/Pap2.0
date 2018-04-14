/**
 * Created by Teerapat on 8/9/2017.
 */

const init_state = {
    lastPage:0,
    result:[],

}

export default function(state=init_state,action) {
    switch (action.type) {
        case "LOAD_PAPER":
            return {...state,...action.payload}
    }
    return state;
}