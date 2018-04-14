/**
 * Created by Teerapat on 8/8/2017.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadPapers,clearPaper} from '../actions';
import ReactPaginate from 'react-paginate';

const loadedPaper = [
    {title:'Research Paper#1','author':'Maibok','year':2001},
    {title:'Research Paper#2','author':'Maibo22k','year':2032},
    {title:'Research Paper#2','author':'Maibo22k','year':2032},
    {title:'Research Paper#2','author':'Maibo22k','year':2032},
    {title:'Research Paper#2','author':'Maibo22k','year':2032},
]

class Search extends Component {


    constructor(props){
        super(props);
        this.state = {
            q:'',
            field:'Title',
            since:null,
            sort:null

        }
    }

    componentDidMount(){
            this.props.clearPaper();
        }


    onSubmit(e){
        e.preventDefault() //So that we won't go to other page
        this.props.loadPapers(this.state);
        //Search form method
    }

    selectType(e){
        this.setState({field:e.target.value});
        //Search form
        this.props.loadPapers(this.state);
    }

    render() {
        const {q,since,sort} = this.state;
        const {lastPage,page,result} = this.props.search;
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={(e)=>this.onSubmit(e)}>
                        <div className="col-md-10">
							<input onChange={(e)=>this.setState({q:e.target.value})} value={q} type="text" className="form-control" id="Search" placeholder="search"/>
                        </div>
                        <div className="col-md-2 pull-right">
                            <select onChange={(e)=>this.selectType(e)} value={this.state.field} className="form-control" style={{"height": "40px"}}>
                                <option>Title</option>
                                <option>Author</option>
                                <option>Faculty</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div style={{marginTop:'30px'}}>
                {result.length>0?
                    <div className="filtercontent" style={{textAlign: 'left'}}>
                        <ul><span>Anytime</span>
                            <li className={since==2017?"active":""} onClick={()=>{this.setState({since:2017}); this.props.loadPapers({...this.state,since:2017});}}>Since 2017</li>
                            <li className={since==2013?"active":""} onClick={()=>{this.setState({since:2013}); this.props.loadPapers({...this.state,since:2013});}}>Since 2013</li>
                        </ul>
                        <ul><span>Sort by relevance</span>
                            <li className={sort=='year'?"active":""} onClick={()=>{this.setState({sort:'year'}); this.props.loadPapers({...this.state,sort:'year'});}}>Sort by date</li>
                            <li className={sort=='citedBys'?"active":""} onClick={()=>{this.setState({sort:'citedBys'}); this.props.loadPapers({...this.state,sort:'citedBys'});}}>Sort by citation</li>
                        </ul>

                    </div>:null
                }
                {result.map((paper,index)=>
					
					<div key={index} className="searchCon">
						<div className="searchres" style={{textAlign:'left'}}>
							<h3><a href="#">{paper[1]}</a></h3>
							<h5 className="author">
								{paper[2]}
							</h5>
							{paper[6]!="None"?<h5> {paper[6]}</h5>:null}
							<h5 className="option">
								<a href="#">cited by # {paper[7]}</a>
                                    &nbsp;&nbsp;
								{paper[8]!="None"?<a target="_blank" href={paper[8]}>[PDF]</a>:null}
							</h5>
						</div>
					</div>
					)
                }

                </div>

			{lastPage>0?<ReactPaginate previousLabel={"previous"}
                                           nextLabel={"next"}
                                           breakLabel={<a href="">...</a>}
                                           breakClassName={"break-me"}
                                           pageCount={lastPage}
                                           marginPagesDisplayed={2}
                                           pageRangeDisplayed={5}
                                           onPageChange={(e) => {console.log(e); window.scrollTo(0, 0); this.props.loadPapers({...this.state,page:e.selected+1})}}
                                           containerClassName={"pagination"}
                                           forcePage={this.props.search.page-1||0}
                                           subContainerClassName={"pages pagination"}
                                           activeClassName={"active"}/>:null
                }

			</div>

        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    };
}
export default connect(mapStateToProps,{loadPapers,clearPaper})(Search);
