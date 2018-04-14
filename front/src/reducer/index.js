/**
 * Created by Teerapat on 8/9/2017.
 */

import { combineReducers } from 'redux';
import test_reducer from './test_reducer';
import search_reducer from './search_reducer';
import report_reducer from './report';
import trend_reducer from './trend_reducer';



const rootReducer = combineReducers({
    test:test_reducer,
    search:search_reducer,
    report:report_reducer,
    trend:trend_reducer,
});


export default rootReducer;