const router = require('express').Router() 
const partner = require('../model/partner') 
const partnerLogin = require('../model/partnerlogin') ; 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendotp = require('../msg91/sendotp')
const verifyotp = require('../msg91/verifyotp') 
const validate = require('../middleware/validate') ; 
router.get('/' , (req , res)=>{
    res.send('Server is running UP II');
}) ; 

router.post('/newpassword' ,async (req , res)=>{
    const body = req.body ; 
    const mobile = body.mobile ; 
    const password = body.password ; 
    if(mobile==null || mobile.length<10){
      return  res.json({
            error:true , 
            msg : "Mobile number is required"
        }) .status(200);
    }
    if(password == null){
        return res.json({
            error:true , 
            msg:"Password is required"
        }).status(200); 
    }

    partner.findOne({
        where:{
            partner_mobile:mobile
        }
    }).then(response=>{
        // console.log(response);
        if(!response){
            return res.json({
                error:true  , 
                msg:"Invalid Request reason mobile number is not found" , 
            }) ; 
        }
        partnerId = response.partner_id ; 
        // console.log(partnerId);
        bcrypt.hash(password , 12 ,async(err , hash)=>{
            // console.log(hash);
            await partnerLogin.update(
                {partner_login_val:hash},
                {where:{
                    partner_login_ref:partnerId
                }}).then(result=>{
                    console.log(result);
                    return res.json({
                        error:false , 
                        msg:'Password updated successfully' 
                    }) ;
                }) .catch(e=>{
                    console.log(e);
                    return res.json({
                        error:true , 
                        msg:'Password updation failed'
                    }) ; 
                    
                })
          
        }) ; //hash password 
        
        
        
    }) ; 


    
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
            // console.log("User is not found");
            return res.json({error:true , msg:'User is not found'}).status(200);
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
                let loginToken = jwt.sign(user.partner_email,process.env.TOKEN_SECRET) ; 
                return  res.json({msg:"Login success" , error : false , token :loginToken, user:user.partner_name}).status(200) ;
            }else{
                return  res.json({msg:"Login failed" , error : true , token :null }).status(200) ;
            }
              
        });

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

router.post('/verify'  ,async(req , res)=>{
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
router.post('/update' , validate  ,  async (req,res)=>{
    const body = req.body ; 
    /**
     * Parameter @required 
     * current password and new password
     */
    const currentPassword = body.password ; 
    const newPassword = body.newpassword ; 
    if(!currentPassword || !newPassword){
        return res.json({
            error : true , 
            msg:"Invalid parameters"
        }) .status(404);
    }
    if(currentPassword === newPassword){
        return res.json({
            error : true , 
            msg:"Password should be different"
        }) .status(200);
    }



    const user =req.user ; 

    partner.findOne({
        where:{
            partner_email:user ,
        }
    }) .then(response=>{
       if(!response){
        return res.json({
            error : true , 
            msg:"User not found"
        }) .status(404); 
       }
       const partnerId =response.partner_id ; 
        //    console.log(partnerId);
        partnerLogin.findOne({
            where:{
                partner_login_ref:partnerId 
            }
        }).then(login=>{
            // console.log(login);
            const loginpassword = login.partner_login_val ; 
            const flag = bcrypt.compareSync(currentPassword , loginpassword) ; 
            console.log(flag);
            if(!flag){
                return res.json({
                    error:true , 
                    msg : "Wrong current password"
                }) .status(200); 
            }
            bcrypt.hash(newPassword , 12 ,async(err , hash)=>{
                if(err){
                    return res.json({
                        error:true , 
                        msg:err
                    }) ; 
                }
                // console.log(hash);
                await partnerLogin.update(
                    {partner_login_val:hash} ,
                    {
                        where:{
                            partner_login_ref : partnerId
                        }
                    }).then(result=>{
                        console.log(result);
                        if(result){
                            return res.json({
                                error:false , 
                                msg:'Password updated'
                            }).status(200) ; 
                        }
                        return res.json({
                            error:true , 
                            msg:'Auth failed'
                        }) .status(200) ; 
                        
                    }) .catch(err=>{
                        return res.json({
                            error:true , 
                            msg:err
                        })
                    }) ; 
                
            }) ;
            
            
        }).catch(err=>{
            console.warn(err);
            
        }); 
       
    }) ; 
    // console.log(body);
    // return res.json({
    //     error:false , 
    //     msg:user
    // });


    
}) ; 

module.exports= router;