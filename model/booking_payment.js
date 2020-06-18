const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const bookingPayment = db.sequelize.define(
    'booking_pay',{
        'booking_pay_id':{
            type:Sequilize.INTEGER  , 
            primaryKey:true
        } , 
        'booking_pay_time' :{
            type:Sequilize.DATE
        } , 
        'booking_pay_startdate':{
            type:Sequilize.DATEONLY 
        } ,
        'booking_pay_enddate':{
            type:Sequilize.DATEONLY 
        } , 
        'booking_pay_elec':{
            type:Sequilize.DOUBLE
        } , 
        'booking_pay_room' : {
            type:Sequilize.INTEGER  
        } , 
        'booking_pay_ref':{
            type:Sequilize.INTEGER
        } , 
        'booking_pay_rent':{
            type:Sequilize.DOUBLE
        } , 
        'booking_pay_others' :{
            type:Sequilize.DOUBLE
        } , 
        'booking_pay_elect_ref':{
            type:Sequilize.INTEGER , 
            defaultValue:null
        } , 
        'booking_pay_period':{
            type:Sequilize.TEXT
        } , 
        'booking_pay_date':{
            type:Sequilize.DATEONLY , 
            defaultValue : null
        } , 
        'booking_pay_submitted_on':{
            type:Sequilize.DATE , 
            defaultValue:null
        } , 
        'booking_pay_submit_date' : {
            type:Sequilize.DATEONLY , 
            defaultValue:null
        } ,  
        'booking_pay_mode':{
            type:Sequilize.TEXT , 
            defaultValue:null , 
        } , 
        'booking_pay_mode_ref':{
            type:Sequilize.TEXT , 
            defaultValue:null  , 
        } , 
        'booking_pay_status' : {
            type:Sequilize.INTEGER , 
            defaultValue:null 
        } , 
        'booking_pay_is_paid':{
            type:Sequilize.INTEGER , 
            defaultValue:0
        } , 
        'booking_pay_token':{
            type:Sequilize.TEXT , 
            defaultValue:null
        }

    } , 
    {
        timestamps:false
    }
) ; 
module.exports = bookingPayment ; 
