import axios from 'axios';
// const express=require('express');
// const app = express();

const submit =async()=>{

    let data={
        name:"cx",
        email:'absc@gc.com',
        password:'dsfsdfsda'
    };
   

     axios.post('http://localhost:5000/api/users',data).then(res=>console.log(res.data));

}
// app.listen(3200);
submit();