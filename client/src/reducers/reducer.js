const initialState = {
    posts:[]
 };
 
 const reducer = (state=initialState,action)=>
 {
    switch(action.type)
    {
        case 'POST_ASYNC':
            state={
                 posts: action.value
            }
            break;
        case 'ADD_POST_ASYNC':
             state={
                 posts:[...state.posts,action.value]
             }
             break;
        default:
     }
    return state;
 }
 export default reducer;