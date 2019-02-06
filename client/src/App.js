import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import AddPost from './AddPost.js';
import store from './store.js';
import { Provider } from 'react-redux';
import EditPost from './EditPost.js';
import AddComment from './AddComment.js';


class App extends Component
{
  constructor()
  {
    super();
    this.state={
      posts:[],
      name:'',
      email:''
    }
    this.addPost = this.addPost.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount()
  {
    const name=localStorage.getItem('name');
    const email=localStorage.getItem('email');
    this.setState(
      {
        name: name,
        email:email
      })
    const token=this.props.token;
    console.log("token ",token);
    this.props.showpost(token);
  }

  addPost()
  { 
    const token=this.props.token;
    ReactDOM.render(
      <Provider store={store}>
        <AddPost token={token}/>
      </Provider>,
      document.getElementById('root')
    ); 
  }

  editPost(id)
  {
    const token=this.props.token;
    ReactDOM.render(
      <Provider store={store}>
        <EditPost id={id} token={token}/>
      </Provider>,
      document.getElementById('root')
    ); 
  }

  addComment(id,)
  {
    const token=this.props.token;
    ReactDOM.render(
      <Provider store={store}>
        <AddComment id={id} token={token}/>
      </Provider>,
      document.getElementById('root')
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.reload();
  }
  
  render()
  {
    const p_post = JSON.stringify(this.props.data);
    const posts = JSON.parse(p_post);
    return(
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm-10">
              <h3><b>All posts</b></h3>
              <hr></hr>
              {
                posts.length && posts.map((post,index)=>
                { 
                  return(
                    <div key={index}>
                      <p>
                        ID : <b className="mx-2">{post._id}</b>|
                        Title : <b className="mx-2">{post.title}</b>|
                        Tags  : <b className="mx-2">{post.tags}</b>
                      </p>
                      <b>Comments : </b>
                      <br></br>
                      {post.comments &&  post.comments.map((comment,index)=> <p key={index}>{comment}</p> )}
                      <button onClick={this.editPost.bind(this,post._id)}>Edit</button> &nbsp;
                      <button onClick={this.addComment.bind(this,post._id)}>Comment</button>
                      <hr color="red"></hr>
                    </div>
                  );
                })
              }
            </div>
            <div className="col-sm-2">
              <br></br>
              <h5> Hello <b>{this.state.name}</b> </h5>
              <hr></hr>
              <button id="addPost" onClick={this.addPost}>Add Post</button> &nbsp;
              <br></br><br></br>
              <button id="logout" onClick={this.logout}>Logout</button>
              <br></br><br></br>  
            <div><Profile email={this.state.email} name={this.state.name}/></div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.posts });

const mapDispatchToProps = dispatch=>
{
  return{
    showpost:(token) => dispatch({ type:'POST',token })
  };
};

class Profile extends Component
{
  constructor()
  {
		super();
		this.state = {
			shown: false,
		};
	}	
	
  toggle()
  {
		this.setState(
    {
			shown: !this.state.shown
		});
  }
  
  render()
  {
    var shown = {
			display: this.state.shown ? "block" : "none"
    };
    
    var styles = {
      color:"red"
    }
		
    return(
      <div>
				<h5 style={ shown }>
          Name : <p style={styles}>{this.props.name}</p>
					Email: <p style={styles}>{this.props.email}</p>
				</h5>
				<button onClick={this.toggle.bind(this)}>View Profile</button>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);