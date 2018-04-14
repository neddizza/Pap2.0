/**
 * Created by Teerapat on 8/9/2017.
 */

import React, {Component} from 'react';
import {browserHistory} from 'react-router';



class home extends Component {
    render() {
        return (
            <div>
                <div className="container" style={{'textAlign': 'center'}}>
                    <div className="row">
                        <div className="col-md-3 des">
                            <h1>Keep in track</h1>
                            <p>Track your rank, publication and citation</p>
                            <button className="btn btn-success" data-toggle="modal" data-target="#signup" style={{"marginTop": "50px"}}>SIGN UP</button>
                        </div>
                        <div className="col-md-3 des">
                            <h1>Furnish for the best</h1>
                            <p>Search for specialist and advisor whom actually knowledgeable and on a top rank of that specific field</p>
                            <a onClick={()=>browserHistory.push('/search')}><button className="btn btn-success guide">SEARCH</button></a>
                        </div>
                        <div className="col-md-3 des">
                            <h1>Where we are</h1>
                            <p>The trend will help you figure out where each industry might grow base on the past and present of research records</p>
                            <a onClick={()=>browserHistory.push('/trends')}><button className="btn btn-success guide">TREND</button></a>
                        </div>
                        <div className="col-md-3 des" style={{"paddingBottom":"0px"}}>
                            <h1>Sum up</h1>
                            <p>Static report that show overall summary of all the record we have kept</p>
                            <a onClick={()=>browserHistory.push('/report')}><button className="btn btn-success guide" style={{"marginTop": "25px"}}>REPORT</button></a>
                        </div>
                    </div>

                </div>
                <div className="modal fade" id="signup" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">SIGN UP</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="fname" className="col-sm-3 control-label">Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="fanme"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lname" className="col-sm-3 control-label">Last name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="lanme"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-sm-3 control-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd" className="col-sm-3 control-label">Password</label>
                                        <div className="col-sm-9">
                                            <input type="password" className="form-control" id="pwd" placeholder="Password"/>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-dismiss="modal">SIGN UP</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}



export default home;
