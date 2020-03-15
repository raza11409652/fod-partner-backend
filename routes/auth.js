const router = require('express').Router() 
const partner = require('../model/partner') 
const partnerLogin = require('../model/partnerlogin') ; 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendotp = require('../msg91/sendotp')
const verifyotp = require('../msg91/verifyotp') 
router.get('/' , (req , res)=>{
    res.send('Server is running UP II');
}) ; 

router.post('/login' , async (req , res)=>{
    const date = new Date(); 
    const body = req.body ; 
    // console.log(body);
    const mobile = body.mobile ; 
    const password = body.password;
    
    partner.findOne({
        where:{
            partner_mobile:mobile
        }
    }).then(user=>{
        if(!user){
            console.log("User is not found");
            return res.json({error:false , msg:'User is not found'}).status(200);
        }
        const partnerId = user.partner_id ; 
        // console.log(partnerId);
        partnerLogin.findOne({
            where:{
            partner_login_ref:partnerId
            }
        }).then(partner=>{
            // console.warn(partner);
            if(bcrypt.compareSync(password , partner.partner_login_val)){
                let loginToken = jwt.sign(user.partner_email,process.env.TOKEN_SECRET , {
                    expiresIn:144440
                } )  ; 
                return  res.json({msg:"Login success" , error : false , token :loginToken, user:user.partner_name}).status(200) ;
            }else{
                return  res.json({msg:"Login failed" , error : true , token :null }).status(200) ;
            }
              
        })
        
        // return res.json({error:true , 'partner':partnerId}).status(200);

    }).catch(e=>{
        return res.json({error:true , msg:e}).status(404);
    }) ; 
    
    

}) ; 

router.post('/reset' , async(req,res)=>{
    const body =req.body ; 
    const mobile = body.mobile ; 
    // console.log("mobile"  , mobile);

    partner.findOne({
        where:{
            partner_mobile:mobile
        }
    }).then(response=>{
        if(!response){
            return res.json({error:true , msg:'No user found '}).status(200) ; 
        }
        // console.log(response);
        const status = response.partner_status ; 
        // console.log(status);
        if(status!=1){
            return res.json({error:true , msg:'Please contact to support'}).status(200) ; 
        }
        var mobilewithcode = "91"+mobile ; 
        sendotp(mobilewithcode).then(result=>{
          console.log(result);
          const type = result.type ; 
          if(type=='error'){
                return res.json({
                    error:true , 
                    msg:result.message
                }).status(200) ;
            }else{
                return res.json({
                    error:false , 
                    msg:"OTP has been sent to your mobile number" 
                }).status(200) ; 
            }
          
            
        }).catch(e=>{
            return res.json({
                error : true,
                msg:e 
            })  ; 
        }); 

    }).catch(e=>{
        return res.json({
            error:true ,
            msg:e
        }) .status(404); 
    }) ;

    
}) ; 

router.post('/verify'  , async(req , res)=>{
    //this end point will require Mobile numbe and OTP
    const body = req.body ; 
    const mobile = body.mobile  ;
    const otp  = body.otp  ;
    var mobilewithcode = "91"+mobile ; 
    verifyotp(otp , mobilewithcode).then(result=>{
        let type = result.type ; 
        if(type=='error'){
            return res.json({
                error:true , 
                msg:result.message
            }).status(200) ;
        }else{
            return res.json({
                error:false , 
                msg:result.message
            }) ; 
        }
        
        
    }).catch(error=>{
        console.log(error);
        
    }) ; 



}) ; 

module.exports= router;