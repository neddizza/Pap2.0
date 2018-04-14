import React, { Component } from 'react';
import { Router, Route, Link, browserHistory,hashHistory,IndexRoute,IndexRedirect } from 'react-router'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducer';

import Landing from './component/landing';
import Report from './component/report';
import Search from './component/search';
import Trends from './component/trends';
import Trends_cloud from './component/trends_cloud';

//TU Stuff
import TUSearch from './component/TUSearch';
import Trends_cloud_crawled from './component/trends_cloud_crawled';

import home from './component/home';
import './App.css';
import DefaultClass from './component/template/default';

import Report_SIIT from './component/report_gscolar'


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/" component={DefaultClass}>
                  <IndexRedirect to="/home"/>
                  <Route path="home" component={home}/>
                  <Route path="report" component={Report}/>
                  <Route path="reportsiit" component={Report_SIIT}/>
                  <Route path="search" component={Search}/>
                  <Route path="tusearch" component={TUSearch}/>
                  <Route path="overview" component={Trends}/>

                  <Route path="tutrends" component={Trends_cloud}/>
                  <Route path="trends" component={Trends_cloud_crawled}/>

                </Route>
              </Router>
            </Provider>
        );
    }
}

export default App;
