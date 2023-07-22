import React from "react";
import Quicksearchitems from "./Quicksearchitems";


class Quicksearch extends React.Component{
    render(){
        const {quicksearchData} = this.props;
        return(
            <div>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                    </p>
                    <div className="container-fluid">
                        <div className="row">
                            {console.log(quicksearchData,"quicksearchData")}
                            {quicksearchData.map((item)=>{
                                return <Quicksearchitems quicksearchitemData={item}/>
                            })}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Quicksearch;