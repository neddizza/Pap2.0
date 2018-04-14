/**
 * Created by Teerapat on 8/8/2017.
 */

import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class DefaultClass extends Component
{
    render()
    {
        const {pathname} = this.props.location;
        console.log(pathname);
        return (
            <div className="App">

                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div >
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand clickable" onClick={()=>browserHistory.push('/home')}>PaperAnalysisPlatform</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li onClick={()=>browserHistory.push('/home')} className={pathname=='/home'?"active clickable":"clickable"}><a id="home" className="clickable">Home </a></li>
                                <li onClick={()=>browserHistory.push('/search')} className={pathname=='/search'?"active clickable":"clickable"}><a id="search" className="clickable">Search</a></li>
                                <li onClick={()=>browserHistory.push('/tusearch')} className={pathname=='/tusearch'?"active clickable":"clickable"}><a id="tusearch" className="clickable">TUSearch</a></li>
                                <li onClick={()=>browserHistory.push('/overview')} className={pathname=='/overview'?"active clickable":"clickable"}><a id="trends" className="clickable">Overview</a></li>
                                <li onClick={()=>browserHistory.push('/trends')} className={pathname=='/trends'?"active clickable":"clickable"}><a id="trends" className="clickable">Trends</a></li>
                                <li onClick={()=>browserHistory.push('/tutrends')} className={pathname=='/tutrends'?"active clickable":"clickable"}><a id="trends" className="clickable">TUTrends</a></li>
                                <li onClick={()=>browserHistory.push('/report')} className={pathname=='/report'?"active clickable":"clickable"}><a id="report" className="clickable">Report</a></li>
                                <li onClick={()=>browserHistory.push('/reportsiit')} className={pathname=='/reportsiit'?"active clickable":"clickable"}><a id="reportsiit" className="clickable">Report(SIIT)</a></li>



                            </ul>
                            <div className="nav navbar-nav login" style={{"color": "#E6E6E6",cursor: "pointer", float: "right", paddingRight: "15px"}} data-toggle="modal" data-target="login">
                                Log in
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="clear"> </div>

                <div className="modal fade" id="login" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">LOG IN</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd" className="col-sm-2 control-label">Password</label>
                                        <div className="col-sm-9">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox"/> Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-dismiss="modal">SIGN IN</button>
                            </div>
                        </div>
                    </div>
                </div>


                {this.props.children}

            </div>
        );
    }
}



export default DefaultClass;
