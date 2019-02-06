const express  =require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const postsRoutes  =require('./api/routes/posts');
const userRoutes = require('./api/routes/users');

mongoose.connect(
    'mongodb://localhost:27017/mydb',
    {useNewUrlParser:true}
);


app.use(morgan('dev'));
app.use(express.json());

app.use('/posts',postsRoutes);
app.use('/user',userRoutes);

app.use((req,res,next)=>
{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>
{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;