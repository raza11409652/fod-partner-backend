const express = require('express') 
const dotenv = require('dotenv')
const bodyParser  = require('body-parser')
const cors   =require('cors') ;
//Routes Import
const authRouter  = require('./routes/auth') ;
const propertyRouter = require('./routes/propertyroutes') ; 
const app = express() ;
dotenv.config();
const PORT  = process.env.PORT || 2000 ; 
app.use(bodyParser.urlencoded({
    extended:false,
})) ;
app.use(cors());
app.use(bodyParser.json());
// app.use('/api/users' ,authRouter) ;
app.use('/api' , authRouter);
app.use('/property' , propertyRouter);
app.listen(PORT , ()=>{
    console.warn("Server" , `server is runnig on ${PORT}`);
    
}) ; 

