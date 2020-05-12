const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const booking = db.sequelize.define(
    'booking'  , {
        'booking_id' : {
            type:Sequilize.INTEGER , 
            primaryKey:true , 
            autoIncrement:true , 
        } , 
        'booking_booked_on' :{
            type:Sequilize.DATE 
        } , 
        'booking_user':{
            type:Sequilize.INTEGER  , 
            
        } , 
        'booking_number'  :{
            type:Sequilize.TEXT , 
            unique:true 
        } , 
        'booking_time'  : {
            type:Sequilize.TIME  , 
            defaultValue:new Date()
        }  ,
        'booking_start_date' : {
            type:Sequilize.DATE , 
        } , 
        'booking_end_date'  :{
            type:Sequilize.DATE
        } , 
        'booking_total_days' : {
            type:Sequilize.INTEGER
        } , 
        'booking_status' : {
            type:Sequilize.INTEGER
        } , 
        'booking_property'  :{
            type:Sequilize.INTEGER
        } , 
        'booked_by' : {
           type:Sequilize.INTEGER , 
            defaultValue:null ,  
        } , 
        'booked_by_admin' : {
            type:Sequilize.INTEGER , 
            defaultValue:null
        } , 
        'booking_room' : {
            type:Sequilize.INTEGER  , 
            defaultValue:null
        } , 
        'booking_amount' : {
            type:Sequilize.DECIMAL,
            defaultValue:0.0
        }
    },{
        timestamps:false
    }
) ; 
module.exports = booking ; 
