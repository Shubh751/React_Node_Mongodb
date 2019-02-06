import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.js';
import store from './store.js';
import { Provider } from 'react-redux';
import './AddPost.css';

class AddPost extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {
        title:'',tags:'',comments:[],
      }

      this.add=this.add.bind(this);
      this.handleChangeTitle=this.handleChangeTitle.bind(this);
      this.handleChangeTags=this.handleChangeTags.bind(this);
      this.handleChangeComment=this.handleChangeComment.bind(this);
      this.back=this.back.bind(this);
    }
      
    
    add = event=>
    {
      event.preventDefault();
      const title = this.state.title;
      const tags = this.state.tags;
      const comments = [this.state.comments];
      const post={title,tags,comments};
      this.props.addPost(post);
      this.setState({data:''});
    }
    
    handleChangeTitle = event =>
    {
      event.preventDefault();
      this.setState({ title: event.target.value });
    }
    
    handleChangeTags = event =>
    {
      event.preventDefault();
      this.setState({ tags : event.target.value});
    }
    
    handleChangeComment = event =>
    {
      event.preventDefault();
      this.setState({ comments : event.target.value});
    }

    back()
    {
      const token=this.props.token;
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
        <div id="l_form">
          <h3 id="h4-login"><b><i>Add Post</i></b></h3><br></br>
          <form onSubmit={this.add}>
            <input 
              required 
              placeholder="Enter Title" 
              type="text" 
              name="name" 
              onChange={this.handleChangeTitle} /><br></br>
              <br></br>
                
              <input 
                required 
                placeholder="Enter tags" 
                type="text" 
                name="tags" 
                onChange={this.handleChangeTags}
              />
              <br></br>
              <br></br>
                
              <input 
                required 
                placeholder="Enter Comment" 
                type="text" 
                name="comment" 
                onChange={this.handleChangeComment}
              />
              
              <br></br>
              <br></br>
              <br></br>
                
              <input 
                id="add" 
                type="submit" 
                value="Add" 
              />

              &nbsp;&nbsp;&nbsp;
              <button onClick={this.back}>Home</button>
          </form>
        </div>
      );
    }
}

const mapStateToProps = state =>{
    return {
      posts:state.posts
    };
  };
  
const mapDispatchToProps = dispatch=>{
    return {
      addPost:(post) => dispatch({ type:'ADD_POST', post })
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(AddPost);
  