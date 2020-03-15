const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const partnerlogin = db.sequelize.define(
    'partner_login',{
        'partner_login_id':{
            type:Sequilize.INTEGER , 
            primaryKey:true ,
            autoIncrement:true 
        } , 
        'partner_login_val':{
            type:Sequilize.STRING , 
        } , 
        'partner_login_ref':{
            type:Sequilize.INTEGER
        } , 
        'partner_login_time':{
            type:Sequilize.TIME 
        }

    } ,{
        timestamps:false
    }
);
module.exports = partnerlogin ; 