/**
 * Created by Teerapat on 8/9/2017.
 */

export default function(state={},action) {
    switch (action.type) {
        case "LOAD_TEST":
            return {...state,...action.payload}
    }
    return state;
}