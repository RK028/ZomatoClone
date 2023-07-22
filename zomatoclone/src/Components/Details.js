import React from "react";
import axios from "axios";
import queryString from "query-string";
import '../Styles/Details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const customStyles ={
    content:{
        top:'50%',
        left: '50%',
        right:'auto',
        bottom:'auto',
        marginRight: '-50%',
        transform:'translate(-50%, -50%)',
        backgroundColor:'grey',
        border:'1px solid black'
    },
};

class Details extends React.Component{
    constructor(){
        super();
        this.state = {
            restaurant:{}
        }
    }

    componentDidMount(){
        const qs = queryString.parse(this.props.location.search);
        const { restaurant } = qs;

        axios({
            method: 'GET',
            url:`http://127.0.0.1:8900/restaurant/${restaurant}`,
            headers:{'content-Type': 'application/json'}
        })
        .then(response =>{
            this.setState({restaurant : response.data.restaurant})
        })
        .catch(err => console.log(err));
    }

    render(){
        const {restaurant} = this.state;
        return(<div>
            <div>
            <img src="./Assets/t1.jpg" id="img"/>
            <button className="button" >Click to see Image Gallery</button>
            </div>
            <div className="headingD">{restaurant.name}</div>
            <button className="btn-order">Place Online Order</button>

            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="tab-1" name="tab-group-1" checked/>
                    <label for="tab-1">Overview</label>
                    <div className="content">
                        <div className="about">About this place</div>
                        <div className="head">Cuisine</div>
                        <div className="value">Bakery, Fast-food</div>
                        <div className="head">Average Cost</div>
                        <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                    </div>
                </div>
                <div className="tab">
                    <input type="radio" id="tab-2" name="tab-group-1" checked/>
                    <label for="tab-2">Contact</label>
                    <div className="content">
                        <div className="head">Phone Number</div>
                        <div className="value">{restaurant.phone_number}</div>
                        <div className="head">{restaurant.name}</div>
                        <div className="value">{restaurant.address}</div>
                    </div>
                </div>

            </div>
        </div>)
    }
}
export default Details;