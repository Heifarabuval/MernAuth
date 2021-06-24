/*=====================REQUIRES======================*/
require('dotenv').config({path:"./config.env"})
const express = require('express')
const connectDB= require('./config/db')
const errorHandler= require('./middlewares/error')

/*=====================REQUIRES======================*/


/*
* Connect DB
* */
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


/*
* Routes
* */
app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/blog'));

/*
* Error Handler
* */
app.use(errorHandler);


/*
* Run Server
* */
const server= app.listen(PORT,()=>
    console.log(`Server running on port ${PORT}`)
);


process.on('unhandledRejection',(err,promise)=>{
    console.log(`Loggeg Error: ${err}`)
    server.close(()=>process.exit(1));
})


