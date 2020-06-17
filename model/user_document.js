const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 

const userDocument = db.sequelize.define(
    'user_document',{
        'user_document_id'  :{
            type:Sequilize.INTEGER , 
            primaryKey:true
        } , 
        'user_document_type' : {
            type:Sequilize.TEXT , 

        } , 
        'user_document_url' : {
            type:Sequilize.TEXT 
        } , 
        'user_document_ref' : {
          type:Sequilize.INTEGER  , 
            
        } , 
        'user_document_time' : {
            type:Sequilize.TIME 
        }
    } , {
        timestamps:false , 
    }
    

) ;
module.exports = userDocument ;  