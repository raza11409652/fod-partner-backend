const Sequilize =require ('sequelize' ) ; 
const db = require('../database/db') ; 
const property = db.sequelize.define(
    'property',{
        'property_id':{
            type:Sequilize.INTEGER , 
            primaryKey:true  , 
            autoIncrement:true 
        },
        'property_uid':{
            type:Sequilize.STRING , 
            unique:true , 
        } , 
        'property_name':{
            type:Sequilize.STRING
        },
        'property_lat':{
            type:Sequilize.DECIMAL ,
        },
        'property_long':{
            type:Sequilize.DECIMAL
        } , 
        'property_address':{
            type:Sequilize.STRING 
        } ,
        'property_cover_image':{
            type:Sequilize.STRING
        } , 
        'property_type':{
            type:Sequilize.INTEGER
        } , 
        'property_total_room':{
            type:Sequilize.INTEGER
        },
        'property_listing_type':{
            type:Sequilize.INTEGER
        } , 
        'property_price':{
            type:Sequilize.DECIMAL
        } ,
        'property_added_by':{
            type:Sequilize.INTEGER
        } , 
        'property_added_on':{
            type:Sequilize.DATE
        } , 
        'property_status':{
            type:Sequilize.INTEGER
        }

    },{
        timestamps:false
    }
) ; 
module.exports  = property ; 