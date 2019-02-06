import { takeLatest,put,all} from 'redux-saga/effects';
import axios from 'axios';


function* Post(action)
{
    try{
        const data = yield fetch("/posts",
        {
            method: 'GET', 
            headers:{
                'Content-Type': 'application/json',
                'authorization':'Bearer '+action.token
            }
        })
        .then(resp=>resp.json());
        yield put({ type: 'POST_ASYNC', value:data});
    }
    catch(err)
    {
        console.log("error "+err)
    }
    
}


function* addPost(action)
{
    console.log("in addpost",action.post);
    var url="/posts";
    const data=JSON.stringify(action.post);
    const token=localStorage.getItem('token');
    yield fetch(url, {
        method: 'POST',
        body: data,
        headers:{
          'Content-Type': 'application/json',
          'authorization':'Bearer '+token
        }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    yield put({ type: 'ADD_POST_ASYNC', value:data});
}


function* editPost(action)
{
    try
    {
        const id=action.data2.id;
        const url="/posts/"+id;
        const title=action.data2.data;
        let config = {
            headers: {
              'authorization': 'Bearer '+action.data2.token,
            }
          }
        yield axios.patch(url,[{"propName":"title", "value":title}],config);
    }
    catch(err)
    {
        console.log("error: "+err)
    }
    
}

function* addComment(action)
{
    try
    {
        const id=action.data1.id;
        const url="/posts/"+id;
        const post = yield fetch(url,{
            method:'GET',
            headers:{
                'authorization':'Bearer '+action.data1.token
            }
        }).then(resp=>resp.json());
        post.comments.push(action.data1.data);
        const comments=post.comments;
        let config = {
            headers: {
              'authorization': 'Bearer '+action.data1.token,
            }
        }
        yield axios.patch(url,[{"propName":"comments","value":comments}],config);
    }
    catch(err)
    {
        console.log("error : "+err);
    }
}

function* signup(action)
{
    const url="/user/signup"
    const data=action.data
    yield fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(res=>{
        if(res.message==='User created')
        {
            return alert("Registered Successfully");
        }
        else
        {
            alert("Please fill the form properly");
        }
    }).catch(error=>alert(error))
}

export default function* rootSaga()
{
    console.log("in root saga")
    yield all(
    [
        yield takeLatest('POST',Post),
        yield takeLatest('ADD_POST',addPost),
        yield takeLatest('EDIT',editPost),
        yield takeLatest('ADD_COMMENT',addComment),
        yield takeLatest('SIGN_UP',signup)
    ])

}