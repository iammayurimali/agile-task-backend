const express = require("express")
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000;

app.use(express.json())

//db connection
const connectWithDb = require("./config/database.js")
connectWithDb()

//route import and mount
const user = require("./routes/routes")
app.use("/", user)

app.listen(PORT, ()=>{
    console.log(`App is started at Port no ${PORT}`);
})

 app.get("/",(req, res)=>{
    res.send("<h1>This is home page</h1>")
 })