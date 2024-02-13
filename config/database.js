const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () =>{
    mongoose.connect(process.env.db_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB successfully connected"))
    .catch((error) =>{
        console.log("Error in connecting DB")
        console.error(error)
        process.exit(1);
    })
}

module.exports = connectWithDb;