const Refferal = require("../models/Refferal");
const mongoose = require("mongoose");
module.exports = {
  createRefferal: async (RefferalData) => {
const {newUserDiscount,refreeDiscount}=RefferalData;
const userdiscount=parseInt(newUserDiscount);
const rediscount=parseInt(refreeDiscount);
return new Promise(async (resolve) => {
      try {
           if (userdiscount>=0 && rediscount>=0){
            var refer= Refferal?.findOne({ _id: mongoose.Types.ObjectId(RefferalData._id),});
            if(refer){
              Refferal.findOneAndUpdate({_id:RefferalData._id},{newUserDiscount:userdiscount,refreeDiscount:rediscount},{new:true,upsert:true}).exec((err, data) => { 
                if( data){
                    return resolve({
                        status: true,
                        message: "Refferal is updated !",
                        data:data,
                      });
                   }else if(err){
                    return resolve({
                        status: false,
                        message: "Refferal updating failed !",
                        data:data,
                      });
                   }
            });
            }else{
            var newRefferal = new Refferal({
              newUserDiscount: userdiscount,
              refreeDiscount:rediscount,
              CreatedDate: new Date(),
            });
            newRefferal.save(async (error, Refferal) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(Refferal){
              return resolve({
                status: true,
                data: Refferal,
                message: "Refferal has been created",
              });
            }
            });
          // }
           }
          }else{
              return resolve({
                status: false,
                message: "Inserted amount is should not be negative !",
                data:data,
              });
            }
          
        
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    });
  },

  getRefferal:async()=>{
return new Promise(async(resolve)=>{
  try{
Refferal.findOne({},async(err,data)=>{
  if(err)
  return resolve({
    status:false,
    message:"Somwething went Wrong"
  });
  if(data)
  return resolve({
    status:true,
    data:data,
    message:"Data retrive Successfully"
  })
})
  }catch(error){
return resolve({
  ststus:false,
  message:"Please try again sometime"+error,
});
  }
});
  },
};