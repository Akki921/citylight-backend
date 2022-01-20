const Wallet =require("../models/Wallet")
const Transaction=require("../models/Transaction")
const mongoose=require("mongoose");

module.exports = {
  //register new Wallet
  createWallet: async (WalletData) => {
    return new Promise(async (resolve) => {
      try {
        Wallet.findOne(
          {
            userId: WalletData.userId,
          },
          async (err, data) => {
            if (err)
              return resolve({
                status: false,
                message: "Please try after some time",
              });
            if (data)
              return resolve({
                status: false,
                message: "Wallet is already created",
              });
            var newWallet = new Wallet({
                userId: WalletData.userId,
                FirstName:WalletData.FirstName,
                email:WalletData.email,
              CreatedDate: new Date(),
              CreatedBy: 0,
            });
           
            
            newWallet.save(async (error, wallet) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(wallet){
                    var newTrasaction=new Transaction({
                        walletId:wallet._id
                        
                    })
                    newTrasaction.save(async(error,transaction)=>{
                        if(error)
                        return resolve({
                            status: false,
                            message: "Please try after some time",
                        });
                        return resolve({
                            status: true,
                            data: {wallet,transaction},
                            message: "Wallet has been created",
                          });

                    })
                }
              return resolve({
                status: true,
                data: wallet,
                message: "Wallet has been created",
              });
            });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  getAllWallet: async () => {
    return new Promise(async (resolve) => {
      try {
        Wallet.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Data retrieved successfully",
            });
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },


  getWalletDataById: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Wallet.find({_id: id}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Data retrieved successfully",
            });
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  
  makeTransaction: async (WalletData) => {
    //   console.log(WalletData);
    const {availableBalance,debit,credit}=WalletData;
    const availableBalances=parseInt(availableBalance)
    const credits=parseInt(credit)
    const debits=parseInt(debit)
    return new Promise(async (resolve) => {
      try {
          if(availableBalance>=0)
          {
          if(debits>0){
        var newTrasaction = new Transaction({
           walletId:WalletData._id,
           debit:debits,
           availableBalance:availableBalances-debits
          });
          newTrasaction.save((error,data)=>{
            if(error){
                return resolve({
                 status:true,
                 message:'something went wrong'
                })
            }
            if(data){
             Wallet.findOneAndUpdate({_id:WalletData._id},{availableBalance:data.availableBalance}, (err,data)=>{
                 if(err){
                 return resolve({
                     status:true,
                     message:'there is a problem'
                 })
             }
             if(data){
                 return resolve({
                     status:true,
                     data1:data,
                     message:'Wallet Recharged successfully'
                 })
             }
             });
            }
        })

         }else if(credits>0){
            var newTrasaction = new Transaction({
                walletId:WalletData._id,
                credit:credits,
                availableBalance:availableBalances+credits
               });
               newTrasaction.save((error,data)=>{
                   if(error){
                       return resolve({
                        status:true,
                        message:'something went wrong'
                       })
                   }
                   if(data){
                    Wallet.findOneAndUpdate({_id:WalletData._id},{availableBalance:data.availableBalance}, (err,data)=>{
                        if(err){
                        return resolve({
                            status:true,
                            message:'there is a problem'
                        })
                    }
                    if(data){
                        return resolve({
                            status:true,
                            data2:data,
                            message:'Wallet Recharged successfully'
                        })
                    }
                    });
                   }
               })
        }

        }else
        {
            return resolve({
                status:true,
                message:'You Do not Enough Balance'
            })
            
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },
 
  
  getAllTransactionbyid: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Transaction.find({walletId:{$in:mongoose.Types.ObjectId(id)}}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time"+err,
              
            });
          if (data)
            return resolve({
              status: true, 
              data: data,
              message: "Data retrieved successfully",
            });
            
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2"+error,
        });
      }
    });
  },
};
