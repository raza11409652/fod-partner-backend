const propertyModel  = require('../model/property') ;
let find = async (_propertymapping)=>{
    // console.log(_propertymapping);
    var properties = [];
    _propertymapping.forEach(async element => {
    var propertyid =  await element.partner_mapping_property ; 
       return  await propertyModel.findOne({
        where:{
            property_id:propertyid
        }
       }).then(result=>{
        //    console.log(result);
           properties.push(result)
       }).catch(err=>{
           log(err);
       }); 


    });
    return  properties;
}
module.exports = find ; 