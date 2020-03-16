const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 

const propertymapping = db.sequelize.define(
    'partner_mapping',{
        'partner_mapping_id':{
            type:Sequilize.INTEGER , 
            primaryKey:true , 
            autoIncrement:true
        },
        'partner_mapping_property':{
            type:Sequilize.INTEGER 
        } , 
        'partner_mapping_partner':{
            type:Sequilize.INTEGER
        },
        'partner_mapping_property_name':{
            type:Sequilize.STRING
        }
    },{
        timestamps:false
    }
) ; 

module.exports = propertymapping ; 