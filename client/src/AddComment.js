import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.js';
import store from './store.js';
import { Provider } from 'react-redux';

class AddComment extends Component
{
    constructor()
    {
        super();
        this.state={
            data:''
        }

        this.add=this.add.bind(this);
        this.addCom=this.addCom.bind(this);
        this.back = this.back.bind(this);
    }
    
    addCom = event =>
    {
        this.setState({ data:event.target.value })
    }

    add(e)
    {
        e.preventDefault();
        const id=this.props.id
        const data=this.state.data
        const token=this.props.token
        const data1={id,data,token};
        this.props.addComment(data1,token)
        this.setState({data:''})
    }

    back()
    {
        const token=this.props.token
        ReactDOM.render(
            <Provider store={store}>
                <App token={token}/>
            </Provider>,
            document.getElementById('root')
        ); 
    }

    render()
    {
        return(
            <div className="App">
                <h3 id="h4-login">
                    <b><i>
                        Add Comment
                    </i></b>
                </h3>
                <br></br>
                <form onSubmit={this.add}>
                    <input 
                        placeholder="Enter Comment" 
                        type="text" 
                        name="add_comment" 
                        onChange={this.addCom} 
                    />
                    {this.state.data}
                    <br></br><br></br>
                    <button class="b1" type="submit">Add</button>&nbsp;
                    <button onClick={this.back}>Home</button>
                </form>    
            </div>
        );
    }
}

const mapStateToProps = state => ({ data: state.posts });

const mapDispatchToProps = dispatch =>{
    return{
        addComment:(data1) => dispatch({ type: 'ADD_COMMENT', data1 })
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AddComment);