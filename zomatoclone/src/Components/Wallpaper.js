import React from "react";
import axios from "axios";
import{ withRouter } from "react-router-dom";

class Wallpaper extends React.Component{

    constructor(){
        super();
        this.state ={
            restaurants: [],
            inputText: '',
            suggestions:[]
        }
    }
    handleLocation =(event)=>{
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            method: 'GET',
            url:`http://localhost:8900/restaurants/${locationId}`,
            headers:{'content-Type': 'application/json'}
        })
        .then(response =>{
            console.log(response)
            this.setState({restaurants:response.data})
        })
        .catch(err => console.log(err));
    }

   handleSearch = (event)=>{
    let inputText = event.target.value;
    const {restaurants} = this.state;
    
    if(restaurants.length > 0){
        var suggestions = restaurants.filter((item) => {
                return item.name.toLowerCase().includes(inputText.toLowerCase())
              }
        );
        this.setState ({ suggestions, inputText});
    }  
    
   }

   showSuggestion =()=>{
    const {suggestions, inputText} = this.state;
    if(suggestions.length === 0 && inputText === undefined){
        return null;
    }
    if (suggestions.length > 0 && inputText === ''){
        return null;
    }
    if(suggestions.length === 0 && inputText){
        return <ul>
            <li>No search Results Found</li>
        </ul>
    }
    return (
        <ul>
            {suggestions.map((item,index)=>(
                console.log(item),
                // <li className="locationDropdown">{`${item.name},${item.locality},${item.city}`}</li>
                <li className="ResSel" onClick ={()=>{this.selectingRestaurant(item)}} key ={index}>{item.name}</li>
            ))}
        </ul>
    );
   }

   selectingRestaurant= (resobj)=>{
    console.log(resobj,"resobj")
       this.props.history.push(`/details?restaurant=${resobj.location_id}`);
   }
   
    render(){
        const {locationsData} = this.props;
        return(
            <div>
                <img src="../Assets/home.jpg" className="img" alt="not found"/>
                <div>
                    <div className="logo">
                        <b>e!</b> 
                    </div>
                    <div className="heading">
                        Find the best restaurants, cafes, bars
                    </div>
                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleLocation}>
                            <option value="0" >Select</option>
                            {locationsData.map((item)=>{
                                return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                            })}
                        </select>
                        <div>
                    <span className="glyphicon glyphicon-search search"></span>
                    <input  id="query" className="restaurantsinput" type="text" placeholder="Please Enter Restaurants Name" onChange={this.handleSearch}/>
                    {this.showSuggestion()}
                    
                    </div>
                    </div>
                    </div>
            </div>
          )
    }
}
export default withRouter(Wallpaper);