import React from "react";
import {withRouter,Link} from "react-router-dom";

class Quicksearchitems extends React.Component{
    handleNavigate =(mealtypeId) =>{

        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            return (`/filter?mealtype=${mealtypeId}&location=${locationId}`);
        }else{
            return (`/filter?mealtype=${mealtypeId}`);
        }
       
    }

    render(){
        const {name, content , image ,meal_type } = this.props.quicksearchitemData;
        return(
            <Link className="col-sm-12 col-md-6 col-lg-4" to={()=>this.handleNavigate(meal_type)}>
                <div className="tileContainer">
                    <div className="tilecomponent1">
                        <img src={`./${image}`} height='150' width='140'/>
                    </div>
                    <div className="tilecomponent2">
                        <div className="componentHeading">
                           <h4>{name}</h4>
                            </div>
                            <div className="componentSubHeading" style={{wordBreak:"break-all",marginRight:"10px" ,padding:"3px",textAlign:"justify"}}>
                                {content}
                            </div>
                    </div>
                </div>
            </Link>
        )
    }
}
export default Quicksearchitems;