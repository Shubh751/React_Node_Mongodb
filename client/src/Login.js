import React, { Component } from 'react';
import './login.css';
import App from './App.js';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import SignUp from './SignUp.js';


class Login extends Component
{
    constructor()
    {
        super();
        this.state={
            email:'',
            password:''
        }
        this.verifyData = this.verifyData.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    
    handleEmail = event=>
    {
        this.setState({ email:event.target.value })
    }
    handlePassword = event=>
    {
        this.setState({ password:event.target.value })
    }

    verifyData = event =>
    {
        event.preventDefault();
        const data={
            email:this.state.email,
            password:this.state.password
        };
        console.log("in login",data)
        const url="/user/login";
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
        }).then((res => res.json()))
          .then(res => { 
                if(res.message==="Authentication succesful")
                {
                    let token=''
                    return(
                        console.log("success....",res),
                        localStorage.setItem('token',res.token),
                        token=localStorage.getItem('token'),
                        localStorage.setItem('name',res.name),
                        localStorage.setItem('email',res.email),
                        
                        console.log("local storage",token),
                        gotoApp(token)
                    )
                }
                else{
                    return alert("email or password is wrong")
                }
        }).catch(error=>console.log("error....",error))
    }

    signUp(e)
    {
        e.preventDefault();
        ReactDOM.render(<Provider store={store}><SignUp/></Provider>,document.getElementById('root'));
    }

    

    render()
    {
        return(
            <div className="Main">
                <div id="l_form">
                    <h3 id="h4-login"><b><i>Log-In</i></b></h3>
                    <br></br>
                    <form>
                        <br></br>    
                        <input 
                            placeholder="E-mail"
                            type="text"
                            name="email"
                            onChange={this.handleEmail}
                        />
                       <br></br><br></br>
                       <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            onChange={this.handlePassword}
                        />
                        <br></br><br></br><br></br>
                        <button onClick={this.verifyData}>Login</button>
                        <br></br><br></br>
                    </form>
                    Don't have an account ?<button id="signup-button" onClick={this.signUp}>Click here</button>to SignUp
                </div>
            </div>
        );
    }
}

function gotoApp(token)
{
    console.log("in app");
    ReactDOM.render(
        <Provider store={store}>
          <App token={token}/>
        </Provider>,document.getElementById('root')
    ); 
}

export default Login;
