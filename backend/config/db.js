const mongoose = require('mongoose');




const connectDB =async()=>{
    try{
        // const conn=await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect("mongodb+srv://backupshello:backups%40123@cluster0.6qxecg4.mongodb.net");
        console.log(`mongo connected: ${conn.connection.host}`)
    }
    catch(err){
        console.error(`error : ${err.message}`)
        process.exit(1);
    }
};

module.exports=connectDB;
