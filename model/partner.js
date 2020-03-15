const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const partner =db.sequelize.define(
    'partner',{
        'partner_id':{
            type:Sequilize.INTEGER , 
            primaryKey:true , 
            autoIncrement:true
        } , 
        'partner_uid':{
            type:Sequilize.STRING , 
            unique:true
        } , 
        'partner_email':{
            type:Sequilize.STRING , 
            unique:true 
        },
        'partner_mobile':{
            type:Sequilize.STRING , 
            unique:true 
        } , 
        'partner_time':{
            type:Sequilize.DATE , 
            defaultValue :Sequilize.NOW
        } , 
        'partner_created_by' :{
            type:Sequilize.INTEGER 
        } , 
        'partner_name' :{
            type:Sequilize.STRING 
        } , 
        'partner_status':{
            type:Sequilize.SMALLINT
        }
    },{
            timestamps: false
    }
    
);

module.exports = partner ; 