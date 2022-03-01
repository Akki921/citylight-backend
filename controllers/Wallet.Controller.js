const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

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
              FirstName: WalletData.FirstName,
              Mobile: WalletData.Mobile,
              CreatedDate: new Date(),
              CreatedBy: 0,
            });

            newWallet.save(async (error, wallet) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (wallet) {
                var newTrasaction = new Transaction({
                  walletId: wallet._id,
                });
                newTrasaction.save(async (error, transaction) => {
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  return resolve({
                    status: true,
                    data: { wallet, transaction },
                    message: "Wallet has been created",
                  });
                });
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
        Wallet.find({})
        .sort({ FirstName: -1 }).collation({ locale: "en", caseLevel: true })
          .populate("userId", "username")
          .exec((error, data) => {
            if (error)
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
    console.log(id)
    return new Promise(async (resolve) => {
      try {
        Wallet.find({ userId: id }, async (err, data) => {
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
    const { availableBalance, debit, credit, id } = WalletData;
    const availableBalances = parseInt(availableBalance);
    const credits = parseInt(credit);
    const debits = parseInt(debit);
    console.log(credits, debits, availableBalances,id);
    return new Promise(async (resolve) => {
      try {
        if (availableBalances >= 0) {
          if (debits > 0) {
            var newTrasaction = new Transaction({
              walletId: WalletData.id,
              debit: debits,
              availableBalance: availableBalances - debits,
            });
            newTrasaction.save((error, data) => {
              if (error) {
                return resolve({
                  status: true,
                  message: "something went wrong",
                });
              }
              if (data) {
                Wallet.findOneAndUpdate(
                  { _id: data.walletId },
                  { availableBalance: data.availableBalance },
                  (err, data) => {
                    if (err) {
                      return resolve({
                        status: true,
                        message: "there is a problem",
                      });
                    }
                    if (data) {
                      return resolve({
                        status: true,
                        data1: data,
                        message: "Wallet Recharged successfully",
                      });
                    }
                  }
                );
              }
            });
          } else if (credits > 0) {
            console.log("enter into credits", WalletData.id);
            var newTrasaction = new Transaction({
              walletId: WalletData.id,
              credit: credits,
              availableBalance: availableBalances + credits,
            });
            newTrasaction.save((error, data) => {
              console.log(data);
              if (error) {
                return resolve({
                  status: true,
                  message: "something went wrong"+error,
                });
              }
              if (data) {
                Wallet.findOneAndUpdate(
                  { _id: data.walletId },
                  { availableBalance: data.availableBalance },
                  (err, data) => {
                    if (err) {
                      return resolve({
                        status: true,
                        message: "there is a problem",
                      });
                    }
                    if (data) {
                      console.log("succesfull", data);
                      return resolve({
                        status: true,
                        data2: data,
                        message: "Wallet Recharged successfully",
                      });
                    }
                  }
                );
              }
            });
          }
        } else {
          return resolve({
            status: true,
            message: "You Do not Enough Balance",
          });
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
        Transaction.find(
          { walletId: { $in: mongoose.Types.ObjectId(id) } },
          async (err, data) => {
            if (err)
              return resolve({
                status: false,
                message: "Please try after some time" + err,
              });
            if (data)
              return resolve({
                status: true,
                data: data,
                message: "Data retrieved successfully",
              });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  // createAddressSlip: async (Data) => {
  //   return new Promise(async (resolve) => {
  //     console.log(Data);
  //     try {
  //       CustomerProfile.findOne({ customer: Data.user }).exec((err, data) => {
  //         if (data) {
  //           return resolve({
  //             status: true,
  //             message: "profile is already created !",
  //             data: data,
  //           });
  //         } else {
  //           var newprofile = new CustomerProfile({
  //             login: Data.login,
  //             username: Data.username,
  //             houseno: Data.houseno,
  //             address: Data.address,
  //             city: Data.city,
  //             locality: Data.locality,
  //             ringtheBell: Data.ringtheBell,
  //           });
  //           newprofile.save(async (error, data) => {
  //             if (error)
  //               return resolve({
  //                 status: false,
  //                 message: "Please try after some time",
  //               });
  //             if (data) {
  //               return resolve({
  //                 status: true,
  //                 data: City,
  //                 message: "Profile has been created",
  //               });
  //             }
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       return resolve({
  //         status: false,
  //         message: "Please try after some time" + error,
  //       });
  //     }
  //   });
  // },

  makefullfilledorder: async (WalletData) => {
    return new Promise(async (resolve) => {
      //console.log(WalletData);
      try {
        if (WalletData) {
          let dd = await Transaction.insertMany(WalletData.Debiteddata);
          console.log('dd',dd)
          if (dd) {
            dd.map((data)=>{ 
            Wallet.updateMany(
              { _id: data.walletId },
              { availableBalance: data.availableBalance },
              (err, data) => {
                if (err) {
                  return resolve({
                    status: true,
                    message: "there is a problem",
                  });
                }
                if (data) {
                  console.log("succesfull", data);
                  return resolve({
                    status: true,
                    data2: data,
                    message: "Wallet Recharged successfully",
                  });
                }
              }
            );
          })
          } else {
            return resolve({
              status: true,
              data: dd,
              message: "Transection has not been created",
            });
          }
        } else {
          return resolve({
            status: true,
            message: "transection is failed because of no data",
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },
};
