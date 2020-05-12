const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const room  = db.sequelize.define(
    'room',{
        'room_id':{
            type:Sequilize.INTEGER , 
            primaryKey:true  , 
            autoIncrement  : true  , 
        } , 
        'room_number' :{
            type:Sequilize.TEXT , 
        } , 
        'room_initial_reading' : {
            type:Sequilize.TEXT
        } ,
        'room_created_at':{
            type:Sequilize.DATEONLY
        } , 
        'room_ref':{
            type:Sequilize.INTEGER
        } , 
        'room_is_vacant':{
            type:Sequilize.INTEGER , 
            defaultValue:0
        }

    } , {
        timestamps:false
    }
) ; 
module.exports = room ; 