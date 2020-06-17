const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const users = db.sequelize.define(
    'user',{
        'user_id'   :{
            type:Sequilize.INTEGER , 
            primaryKey:true,
        } , 
        'user_uid':{
            type:Sequilize.TEXT , 
            unique:true   , 
        } , 
        'user_phone':{
            type:Sequilize.TEXT , 
            unique:true
        } , 
        'user_email':{
            type:Sequilize.TEXT , 
            
        } , 
        'user_name':{
            type:Sequilize.TEXT
        } , 
        'user_father':{
           type:Sequilize.TEXT 
        } , 
        'user_profile_image' :{
            type:Sequilize.TEXT , 
        } , 
        'user_is_verified' : {
            type:Sequilize.SMALLINT , 
            defaultValue:0
        }
    }  , {
        timestamps:false
    }


) ; 

module.exports = users ; 