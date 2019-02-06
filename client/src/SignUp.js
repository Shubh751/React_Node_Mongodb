import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import Login from './Login.js';
import { connect } from 'react-redux';
import './SignUp.css';

class SignUp extends Component
{
    constructor()
    {
        super();
        this.state={
            email:'',
            password:'',
            name:''
        }
        this.submit=this.submit.bind(this);
        this.login=this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]:e.target.value })
    }

    submit(e)
    {
        e.preventDefault();
        const data={
            email:this.state.email,
            password:this.state.password,
            name:this.state.name
        }
        this.props.signup(data);
    }

    login(e)
    {
        e.preventDefault();
        ReactDOM.render(
            <Provider store={store}>
                <Login/>
            </Provider>, 
            document.getElementById('root')
        );
    }

    render()
    {
        return(
            <div id="l_form">
                <h3 id="h4-login"><b><i>Sign-Up</i></b></h3><br></br><br></br>
                <form onSubmit={this.submit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Name" 
                            name="name" 
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Email" 
                            name="email" 
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        <input
                            type="password"
                            placeholder="Enter password" 
                            name="password"
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button type="submit">SignUp</button>&nbsp;&nbsp;&nbsp;
                    <button id="login-button"onClick={this.login}>Login</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({ data: state.posts });


const mapDispatchToProps = dispatch =>{
    return{
        signup:(data) => dispatch({ type:'SIGN_UP' , data })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
