import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.js';
import store from './store.js';
import { Provider } from 'react-redux';


class EditPost extends Component
{
    constructor()
    {
        super();
        this.state={
            data:''
        }
        this.edit = this.edit.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.back = this.back.bind(this);
    };

    edit(e)
    {
        e.preventDefault();
        var id=this.props.id;
        const data = this.state.data
        const token=this.props.token
        const data2={id,data,token}
        this.props.editThePost(data2)
        this.setState({data:''})
    }

    editTitle= event=>
    {
        this.setState({data:event.target.value})
    }

    back()
    {
        const token=this.props.token;
        ReactDOM.render(
        <Provider store={store}>
            <App token={token}/>
        </Provider>,document.getElementById('root'));
    }
    
    render()
    {
        return(
            <div className="App">
                <h3 id="h4-login"><b><i>ID : {this.props.id}</i></b></h3><br></br>
                <form onSubmit={this.edit}>
                    <input 
                        placeholder="Enter title" 
                        type="text" 
                        name="edit_title" 
                        onChange={this.editTitle} 
                    />
                    {this.state.data}
                    <br></br><br></br>
                    <button className="b1" type="submit">Add</button>&nbsp;
                    <button onClick={this.back}>Home</button>
                </form> 
            </div>
        );
    }
}


const mapStateToProps = state => ({ data: state.posts });

const mapDispatchToProps = dispatch=>{
  return {
    editThePost:(data2) => dispatch({ type:'EDIT',data2})
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(EditPost);
