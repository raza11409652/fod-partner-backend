const axios = require('axios')
const qs = require('querystring') 

const sendotp = async (mobile)=>{
    const URL = "https://api.msg91.com/api/v5/otp" ; 
    var requestBody ={
        "authkey":process.env.MSG_91_API_KEY , 
        "template_id":process.env.MSG_91_OTP_TEMPLATE , 
        "mobile":mobile 
    } ; 
    var config={
        headers: {
            "content-type": "application/json"
        } 
    } ; 
    return axios({
        method:'GET',
        url:URL , 
        data:requestBody,
    }).then(res=>{
        return res.data;
    });
    
    
}
module.exports = sendotp ; 



