import React from "react";
import axios from "axios";


import Wallpaper from "./Wallpaper";
import Quicksearch from "./QuickSearch";
import '../Styles/Home.css'

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [ ],
            mealtypes : [ ]
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            method: 'GET',
            url:'http://127.0.0.1:8900/locations',
            headers:{'content-Type': 'application/json'}
        })
        .then(response =>{
            this.setState({locations:response.data.locations})
        })
        .catch(err => console.log(err));

        axios({
            method: 'GET',
            url:'http://localhost:8900/mealtypes',
            headers:{'content-Type': 'application/json'}
        })
        .then(response =>{
            this.setState({mealtypes:response.data.MealTypes})
        })
        .catch(err => console.log(err));
    }


    render(){
        const {locations , mealtypes} = this.state;
        return(
            <div>
                <Wallpaper locationsData = {locations}/>
                <Quicksearch quicksearchData = {mealtypes}/>
            </div>
        )
    }
}
export default Home;