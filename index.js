const express = require("express")
const cookieParser = require("cookie-parser");
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require("./typedefs/typedefs")
const resolvers = require("./Resolvers/resolvers")

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cookieParser());

//db connection
const connectWithDb = require("./config/database.js")
connectWithDb()

//route import and mount
const user = require("./routes/routes")
app.use("/", user)




const startServer = async() =>{
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app:app});
    app.listen(PORT, ()=>{
        console.log(`App is started at Port no ${PORT}`);
    })
}
startServer()
