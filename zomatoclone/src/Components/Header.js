import React from "react";
import Modal from "react-modal";
import "react-responsive-carousel";
import '../Styles/Header.css';
import GoogleLogin  from "react-google-login";

const customStyles ={
    content:{
        top:'50%',
        left: '50%',
        right:'auto',
        bottom:'auto',
        marginRight: '-50%',
        transform:'translate(-50%, -50%)',
        backgroundColor:'grey',
        border:'1px solid black',
        
    },
};
class Header extends React.Component{
    constructor(){
        super();
        this.state= {
            backgroundColor: '',
            display:'none',
            loginModalIsOpen: false,
            LoggedInUser:undefined,
            isLoggedIn :false
        }
    }
    componentDidMount(){
        this.setAttributes();
    }
    setAttributes = (path)=>{
        let bg, display;
        if(path == '/'){
            bg ='#000000';
            display= 'none';
        }
        else{
            bg= '#ff0000';
            display = 'inline-block';
        }
        this.setState({backgroundColor: bg, display:display});
    }
    handleLogin =()=>{
        this.setState({loginModalIsOpen:true});
    }
    handlelogout =()=>{
        this.setState({isLoggedIn:false, LoggedInUser: undefined})
    }
    handleCancel =()=>{
        this.setState({loginModalIsOpen:false});
    }
    responseGoogle = (response)=>{
        this.setState({isLoggedIn: true, LoggedInUser:response.profileObj.name});
    }
    
    render(){
        const {backgroundColor, display, loginModalIsOpen, LoggedInUser,isLoggedIn} = this.state;
        return(
          <div>
          <div className="header" style={{backgroundColor:backgroundColor}}>

             <div className="header-logo" style={{display:display}}>
                <b>e!</b>
                </div>
                {!isLoggedIn ?
                <div className="user-account">
                        <div className="login" onClick={this.handleLogin}>Login</div>
                        <div className="signup">Create an account</div>
                </div>
                :
                <div className="user-account">
                        <div className="login">{LoggedInUser}</div>
                        <div className="signup" onClick={this.handlelogout}>logout</div>
                </div> }
         </div>
                    <Modal
                        isOpen={loginModalIsOpen}
                        style={customStyles}>
                            <div>
                                <h2>Login</h2>
                                <input type="email" placeholder="Email" /><br />
                                <input type="password" placeholder="Password" />
                                <div>
                                    <button>Login</button>
                                    <button onClick={this.handleCancel}>Cancel</button>
                                </div>
                                <div>
                                    <GoogleLogin
                                        clientId="880099360139-tbi2720bjh7f86rsd6animbm90njr4pi.apps.googleusercontent.com"
                                        buttonText="Contiune with Google"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'} />
                                </div>
                            </div>
                     </Modal>
            </div>
        )
    }
}
export default Header;