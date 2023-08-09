const express= require('express')
const cors = require('cors');
const app=express();

const port = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

app.use(express.json({extended:false}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('api running');
});


app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/authenticate'));
app.use('/api/post',require('./routes/api/posts.js'));
app.use('/api/profile',require('./routes/api/profile'));


app.listen(port,()=>{
    console.log(`running on ${port}`);
})