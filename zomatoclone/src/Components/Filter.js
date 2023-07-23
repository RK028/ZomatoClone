import React from "react";
import '../Styles/Filters.css';
import queryString from "query-string";
import axios from "axios";

class Filter extends React.Component{
    constructor(){
        super();
        this.state = {
            restaurants: [],
            locations:[],
            mealtype: undefined,
            location: undefined,
            cusisine:[],
            lcost:undefined,
            hcost:undefined,
            sort:1,
            page:1,
            pageCount:[]
        }
    }
    componentDidMount(){
         const qs = queryString.parse(this.props.location.search);
         const {mealtype} = qs;
         const filterObj ={
            mealtype : Number(mealtype),   
         }

         axios({method: 'POST',
         url:'http://localhost:8900/filter',
         headers:{'content-Type': 'application/json'},
         data :filterObj
         })
         .then(response =>{
            console.log(response,"ressss");
         this.setState({restaurants :response.data,mealtype})
        })
        .catch(err => console.log(err));

        axios({
            method: 'GET',
            url:'http://localhost:8900/locations',
            headers:{'content-Type': 'application/json'}
        })
        .then(response =>{
            this.setState({locations:response.data.locations})
        })
        .catch(err => console.log(err))
    }
    handleLocationChange = (event)=>{
        const location = event.target.value;
        const {mealtype,cusisine, lcost, hcost, sort, page} = this.state;
        const filterObj ={
            mealtype: Number(mealtype),
            cusisine : cusisine.length == 0 ? undefined: cusisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({method: 'POST',
         url:'http://localhost:8900/filter',
         headers:{'content-Type': 'application/json'},
         data :filterObj
         })
         .then(response =>{
         this.setState({restaurants :response.data,location})
        })
        .catch(err => console.log(err));
    }
    handleCuisineChange =(cusisineId)=>{
        const {mealtype,cusisine, lcost, hcost, sort, page} = this.state;
      const index = cusisine.indexOf(cusisineId);

      if(index == -1){
        cusisine.push(cusisineId);
      }
      else{
        cusisine.splice(index, 1);
      }
        const filterObj ={
            mealtype: Number(mealtype),
            cusisine : cusisine.length == 0 ? undefined: cusisine,
            lcost,
            hcost,
            sort,
            page
        };

        axios({method: 'POST',
         url:'http://localhost:8900/filter',
         headers:{'content-Type': 'application/json'},
         data :filterObj
         })
         .then(response =>{
         this.setState({restaurants :response.data,cusisine})
        })
        .catch(err => console.log(err));
    }
    handleSortChange = (sort)=>{
        const {mealtype,cusisine,location, lcost,hcost,page} = this.state;
        const filterObj = {
            mealtype:Number(mealtype),
            cusisine : cusisine.length == 0 ? undefined: cusisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };
        axios({method: 'POST',
        url:'http://localhost:8900/filter',
        headers:{'content-Type': 'application/json'},
        data :filterObj
        })
        .then(response =>{
        this.setState({restaurants :response.data,sort,page})
       })
       .catch(err => console.log(err));
    }
    handleCostChange = (lcost, hcost) =>{
        const {mealtype,cusisine,location,sort,page} = this.state;
        const filterObj = {
            mealtype: Number(mealtype),
            cusisine : cusisine.length == 0 ? undefined: cusisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };
        axios({method: 'POST',
        url:'http://localhost:8900/filter',
        headers:{'content-Type': 'application/json'},
        data :filterObj
        })
        .then(response =>{
        this.setState({restaurants :response.data,lcost,hcost})
       })
       .catch(err => console.log(err));
    }
    handlePageChange =(page)=>{
        const {mealtype,cusisine,location,sort,lcost,hcost} = this.state;
        const filterObj = {
            mealtype: Number(mealtype),
            cusisine : cusisine.length == 0 ? undefined: cusisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };
        axios({method: 'POST',
        url:'http://localhost:8900/filter',
        headers:{'content-Type': 'application/json'},
        data :filterObj
        })
        .then(response =>{
        this.setState({restaurants :response.data,page})
       })
       .catch(err => console.log(err));
    }
    render(){
        const {restaurants, locations, pageCount} = this.state;
        return(
        <div>
             <div className="container">
                <div className="row heading">
                    Breakfast places in Mumbai
                </div>
                <div className="row">
                    <div className="col-3 col-sm-12 col-mo-4 col-lg-3">
                        <div className="filterPanel">
                            <div className="filterPanelHeading">Filters</div>
                            <div className="filterPanelSubHeading">Selet Location</div>
                            <select className="locationSelection" onChange={this.handleLocationChange}>
                                <option selected>Select Location</option>
                                {locations.map((item)=>{
                                return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                            })}
                            </select>
                            <div className="filterPanelSubHeading">Cuisine</div>
                            <input type="checkbox" className="cuisinOption" onClick={()=>this.handleCuisineChange(1)}/>
                                <label>North Indian</label>
                        
                            <br/>
                            <input type="checkbox" className="cuisinOption" onClick={()=>this.handleCuisineChange(2)}/>
                                <label>South Indian</label>
                        
                            <br/>
                            <input type="checkbox" className="cuisinOption" onClick={()=>this.handleCuisineChange(3)}/>
                                <label>Chinese</label>
                        
                            <br/>
                            <input type="checkbox" className="cuisinOption" onClick={()=>this.handleCuisineChange(4)}/>
                                <label>Fast Food</label>
                        
                            <br/>
                            <input type="checkbox" className="cuisinOption" onClick={()=>this.handleCuisineChange(5)}/>
                                <label>Street Food</label>
                        
                            <br/>
                            <div className="filterPanelSubHeading">Cost For two</div>

                            <input type="radio" className="cuisinOption" name="cost"  onChange={()=>this.handleCostChange(1,500)}/>
                                <label>Less than &#8377;500</label>
                        
                            <br/>
                            <input type="radio" className="cuisinOption" name="cost"onChange={()=>this.handleCostChange(500,1000)} />
                                <label>&#8377;500 to &#8377;1000</label>
                        
                            <br/>
                            <input type="radio" className="cuisinOption" name="cost" onChange={()=>this.handleCostChange(1000,1500)}/>
                                <label>&#8377;1000 to &#8377;1500</label>
                        
                            <br/>
                            <input type="radio" className="cuisinOption" name="cost" onChange={()=>this.handleCostChange(1500,2000)} />
                                <label> &#8377;1500 to &#8377;2000</label>
                        
                            <br/>
                            <input type="radio" className="cuisinOption" name="cost"onChange={()=>this.handleCostChange(2000,50000)} />
                                <label> &#8377;2000+</label>
                        
                            <br/>
                            <div className="">Sort</div>

                            <input type="radio" className="cuisinOption" name="sort" onChange={() =>this.handleSortChange(1)}/>
                                <label>Price low to high</label>
                        
                            <br/>
                            <input type="radio" className="cuisinOption" name="sort" onChange={() =>this.handleSortChange(-1)} />
                                <label>Price high to low</label>
                        
                        </div>
                    </div>
                    
                     <div className="col-9 col-sm-12 col-md-8 col-lg-9">
                     {restaurants.length > 0 ? restaurants.map(item =>{
                       return (<div className="resultsPannel">
                            <p>{item.name}</p>
                        <div className="row upperSection">
                            <div className="col-2">
                                <img src={`./${item.image}`} className="resultsImage"/>
                            </div>
                            <div className="col-10">
                                <div className="resultsHeading">{item.name}</div>
                                <div className="resultSubHeading">{item.locality}</div>
                                <div className="resultsAddress">{item.city}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row lowerSection">
                            <div className="col-2">
                                <div className="resultsAddress">CUISINES:</div>
                                <div className="resultsAddress">COST FOR TWO:</div>
                            </div>
                            <div className="col-10">
                                <div className="resultSubHeading">{item.cuisine.map((cusisineItem) =>{return cusisineItem.name,console.log(cusisineItem)})}</div>
                                <div className="resultSubHeading">&#8377;{item.min_price}</div>
                            </div>
                        </div>
                     </div>) 
                     }) : <div style={{color:'red',fontSize:'35px',fontWeight:'bold',textAlign:'center',fontFamily:'cursive'}}><h2>No Result Found...</h2></div>}
                      
                      {restaurants.length > 0 ?
                            <div className="pagination">
                                <div className="paginationButton"><i class='bx bx-left-arrow-alt'></i></div>
                                <div className="paginationButton">1</div>
                                <div className="paginationButton">2</div>
                                <div className="paginationButton">3</div>
                                <div className="paginationButton">4</div>
                                <div className="paginationButton">5</div>
                                <div className="paginationButton"><i class='bx bx-right-arrow-alt' ></i></div>
                            </div> : null}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Filter;