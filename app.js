const express = require('express') 
const dotenv = require('dotenv')
const bodyParser  = require('body-parser')
const cors   =require('cors') ;
//Routes Import
const authRouter  = require('./routes/auth') ;
const propertyRouter = require('./routes/propertyroutes') ; 
const bookingRouter = require('./routes/bookingroutes') ; 
const roomRouter = require('./routes/roomroutes') ; 
const userRouter  = require('./routes/usersroutes') ; 
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
app.use('/booking' , bookingRouter );
app.use('/room' , roomRouter);
app.use('/user' , userRouter)  ;
app.listen(PORT , ()=>{
    console.warn("Server" , `server is runnig on ${PORT}`);
    
}) ; 

