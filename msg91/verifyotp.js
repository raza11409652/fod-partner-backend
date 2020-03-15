const axios = require('axios')
const qs = require('querystring') ; 




const verifyotp = async (otp  , mobile)=>{
    const url = "https://api.msg91.com/api/v5/otp/verify";
    const requestBody = {
        "mobile":mobile , 
        "authkey":process.env.MSG_91_API_KEY , 
        "otp":otp
    };

   return await axios.post( url ,qs.stringify(requestBody)).then(res=>{
       return res.data;
   }) ; 
  
}

module.exports = verifyotp ; 