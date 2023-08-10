const mongoose = require('mongoose');




const connectDB =async()=>{
    try{
        // console.log();
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo connected: ${conn.connection.host}`)
    }
    catch(err){
        console.error(`error : ${err.message}`)
        process.exit(1);
    }
};

module.exports=connectDB;
