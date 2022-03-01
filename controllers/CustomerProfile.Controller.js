const CustomerProfile = require("../models/CustomerProfile");
const CityAvailability = require("../models/CityAvailability");
const Cashback = require("../models/Cashback");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { generateOTP, fast2sms } = require("../utils/otp.util");
module.exports = {
  // createCustomerProfile: async (Data) => {
  //   return new Promise(async (resolve) => {
  //     console.log(Data);
  //     try {
  //       CustomerProfile.findOne({"login": Data.login }
  //        )
  //         .exec((err, data) => {

  //           if (data)
  //           {
  //             return resolve({
  //               status: true,
  //               message: "profile is already created !",
  //               data:data,
  //             });
  //           }else{
  //           var newprofile = new CustomerProfile({
  //             login: Data.login,
  //             username: Data.username,
  //             phone: Data.phone,
  //             houseno: Data.houseno,
  //             address: Data.address,
  //             city: Data.city,
  //             locality: Data.locality,
  //             ringtheBell: Data.ringtheBell,
  //             slottime: Data.slottime,
  //           });
  //           newprofile.save(async (error, data) => {
  //             if (error)
  //               return resolve({
  //                 status: false,
  //                 message: "Please try after some time",
  //               });
  //               if(data){
  //             return resolve({
  //               status: true,
  //               data: City,
  //               message: "Profile has been created",
  //             });
  //           }
  //           });
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       return resolve({
  //         status: false,
  //         message: "Please try after some time"+error,
  //       });
  //     }
  //   });
  // },

  //   getCityByID: async (data) => {
  //     return new Promise(async (resolve) => {
  //       try {
  //         City.findById({_id:data}, async (err, data) => {
  //           if (err)
  //             return resolve({
  //               status: false,
  //               message: "Please try after some time"+err,

  //             });
  //           if (data)
  //             return resolve({
  //               status: true,
  //               data: data,
  //               message: "Data retrieved successfully",
  //             });

  //         });
  //       } catch (error) {
  //         return resolve({
  //           status: false,
  //           message: "Please try after some time2"+error,
  //         });
  //       }
  //     });
  //   },

  getProfiles: async () => {

    return new Promise(async (resolve) => {
      try {
        CustomerProfile.find()
        .sort({ username: -1 }).collation({ locale: "en", caseLevel: true })
          .populate("login", "phone")
          .populate("city", "cityName")
          .populate("locality", "locality")
          .exec((err, data) => {
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

  //
  createcProfile: async (Data) => {
    return new Promise(async (resolve) => {
      console.log(Data);
      try {
        CustomerProfile.findOne({ login: Data.login }).exec((err, data) => {
          if (data) {
            CustomerProfile.findOneAndUpdate(
              { _id: data._id },
              {
                login: data.login,
                username: Data.username,
                phone: Data.phone,
                houseno: Data.houseno,
                address: Data.address,
                profileimg: Data.profileimg,
                city: Data.city,
                locality: Data.locality,
                ringtheBell: Data.ringtheBell,
                slottime: Data.slottime,
                refercode: data.refercode,
              },
              { new: true, upsert: true }
            ).exec((err, data) => {
              if (data) {
                return resolve({
                  status: true,
                  message: "login details  is updated !",
                  data: data,
                });
              } else if (err) {
                return resolve({
                  status: false,
                  message: "login details is updating failed !",
                  data: data,
                });
              }
            });
          } else {
            let pres;
            let verify;
            // = 123456;
            let refercashback = "62131c36a4315fb6de3e6fc6";
            let newusercashback;
            let refreeusercashback;
            if (verify !== undefined) {
              const refercode = generateOTP(6);

              CustomerProfile.findOne({ refercode: verify })
                .populate("refercashback", "newUserDiscount refreeDiscount")
                .exec((err, data) => {
                  newusercashback = data.refercashback.newUserDiscount;
                  refreeusercashback = data.refercashback.refreeDiscount;
                  let count = data.refercount + 1;
                  console.log("count", data);
                  CustomerProfile.findOneAndUpdate(
                    { _id: data._id },
                    {
                      login: data.login,
                      username: data.username,
                      phone: data.phone,
                      houseno: data.houseno,
                      address: data.address,
                      profileimg: data.profileimg,
                      city: data.city,
                      locality: data.locality,
                      ringtheBell: data.ringtheBell,
                      slottime: data.slottime,
                      refercode: data.refercode,
                      refercount: count,
                    },
                    { new: true, upsert: true }
                  );
                  console.log("data finr", data);
                  if (data) {
                    Cashback.findOne({ userId: data._id }).exec(
                      (err, cashback) => {
                        if (cashback) {
                          var newTrasaction = new Transaction({
                            CashbackWalletId: cashback._id,
                            credit: refreeusercashback,
                            cashbackBalance:
                              cashback.cashbackBalance + refreeusercashback,
                          });
                          newTrasaction.save((error, data) => {
                            console.log(data);
                            if (error) {
                              return resolve({
                                status: true,
                                message: "something went wrong",
                              });
                            }
                            if (data) {
                              console.log("cashback balance data", data);
                              Cashback.findOneAndUpdate(
                                { _id: data.CashbackWalletId },
                                { cashbackBalance: data.cashbackBalance },
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
                      }
                    );
                  }
                });

              var newCustomerProfile = new CustomerProfile({
                login: Data.login,
                username: Data.username,
                houseno: Data.houseno,
                phone: Data.phone,
                address: Data.address,
                profileimg: Data.profileimg,
                city: Data.city,
                locality: Data.locality,
                ringtheBell: Data.ringtheBell,
                slottime: Data.slottime,
                refercode: refercode,
                refercashback: refercashback,
              });
              newCustomerProfile.save(async (error, Profile) => {
                if (error)
                  return resolve({
                    status: false,
                    message: "Please try after some time" + error,
                  });
                if (Profile) {
                  Wallet.findOne(
                    {
                      userId: Profile._id,
                    },
                    async (err, data) => {
                      if (err)
                        return resolve({
                          status: false,
                          message: "Please try after some time" + err,
                        });
                      if (data)
                        return resolve({
                          status: false,
                          message: "Wallet is already created",
                        });
                      var newWallet = new Wallet({
                        userId: Profile._id,
                        FirstName: Profile.username,
                        Mobile: Profile.phone,
                        CreatedDate: new Date(),
                        CreatedBy: 0,
                      });

                      newWallet.save(async (error, wallet) => {
                        if (error)
                          return resolve({
                            status: false,
                            message: "Please try after some time" + error,
                          });
                        if (wallet) {
                          var newTrasaction = new Transaction({
                            walletId: wallet._id,
                          });
                          newTrasaction.save(async (error, transaction) => {
                            if (error)
                              return resolve({
                                status: false,
                                message: "Please try after some time" + error,
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
                  Cashback.findOne(
                    {
                      userId: Profile._id,
                    },
                    async (err, data) => {
                      if (err)
                        return resolve({
                          status: false,
                          message: "Please try after some time" + err,
                        });
                      if (data)
                        return resolve({
                          status: false,
                          message: "cashback is already created",
                        });
                      var newCashback = new Cashback({
                        userId: Profile._id,
                        CreatedDate: new Date(),
                        CreatedBy: 0,
                      });

                      newCashback.save(async (error, cashback) => {
                        if (error)
                          return resolve({
                            status: false,
                            message: "Please try after some time" + error,
                          });
                        if (cashback) {
                          var newTrasaction = new Transaction({
                            CashbackWalletId: cashback._id,
                          });
                          newTrasaction.save(async (error, transaction) => {
                            if (error)
                              return resolve({
                                status: false,
                                message: "Please try after some time" + error,
                              });
                            if (cashback) {
                              Cashback.findOne({ _id: cashback._id }).exec(
                                (err, cashback) => {
                                  if (cashback) {
                                    var newTrasaction = new Transaction({
                                      CashbackWalletId: cashback._id,
                                      credit: newusercashback,
                                      cashbackBalance:
                                        cashback.cashbackBalance +
                                        newusercashback,
                                    });
                                    newTrasaction.save((error, data) => {
                                      console.log(data);
                                      if (error) {
                                        return resolve({
                                          status: true,
                                          message:
                                            "something went wrong" + error,
                                        });
                                      }
                                      if (data) {
                                        console.log(
                                          "cashback balance data",
                                          data
                                        );
                                        Cashback.findOneAndUpdate(
                                          { _id: data.CashbackWalletId },
                                          {
                                            cashbackBalance:
                                              data.cashbackBalance,
                                          },
                                          (err, data) => {
                                            if (err) {
                                              return resolve({
                                                status: true,
                                                message:
                                                  "there is a problem" + err,
                                              });
                                            }
                                            if (data) {
                                              console.log("succesfull", data);
                                              return resolve({
                                                status: true,
                                                data2: data,
                                                message:
                                                  "cashback Recharged successfully",
                                              });
                                            }
                                          }
                                        );
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          });
                        }
                        return resolve({
                          status: true,
                          data: pres,
                          message:
                            "profile has beeen created successfully has been created",
                        });
                      });
                    }
                  );
                }
              });
            } else {
              const refercode = generateOTP(6);
              var newCustomerProfile = new CustomerProfile({
                login: Data.login,
                username: Data.username,
                houseno: Data.houseno,
                phone: Data.phone,
                address: Data.address,
                profileimg: Data.profileimg,
                city: Data.city,
                locality: Data.locality,
                ringtheBell: Data.ringtheBell,
                slottime: Data.slottime,
                refercode: refercode,
                refercashback: refercashback,
              });
              newCustomerProfile.save(async (error, Profile) => {
                pres = Profile;
                if (error)
                  return resolve({
                    status: false,
                    message: "Please try after some time" + error,
                  });
                if (Profile) {
                  console.log("Profile", Profile);
                  Wallet.findOne(
                    {
                      userId: Profile._id,
                    },
                    async (err, data) => {
                      if (err)
                        return resolve({
                          status: false,
                          message: "Please try after some time" + err,
                        });
                      if (data)
                        return resolve({
                          status: false,
                          message: "Wallet is already created",
                        });
                      var newWallet = new Wallet({
                        userId: Profile._id,
                        FirstName: Profile.username,
                        Mobile: Profile.phone,
                        CreatedDate: new Date(),
                        CreatedBy: 0,
                      });

                      newWallet.save(async (error, wallet) => {
                        if (error)
                          return resolve({
                            status: false,
                            message: "Please try after some time" + error,
                          });
                        if (wallet) {
                          var newTrasaction = new Transaction({
                            walletId: wallet._id,
                          });
                          newTrasaction.save(async (error, transaction) => {
                            if (error)
                              return resolve({
                                status: false,
                                message: "Please try after some time" + error,
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
                          // data: wallet,
                          message: "profile has been created",
                        });
                      });
                    }
                  );

                  ///////////////////cashback wallet///////////////
                  Cashback.findOne(
                    {
                      userId: Profile._id,
                    },
                    async (err, data) => {
                      if (err)
                        return resolve({
                          status: false,
                          message: "Please try after some time" + err,
                        });
                      if (data)
                        return resolve({
                          status: false,
                          message: "cashback is already created",
                        });
                      var newCashback = new Cashback({
                        userId: Profile._id,
                        CreatedDate: new Date(),
                        CreatedBy: 0,
                      });

                      newCashback.save(async (error, cashback) => {
                        if (error)
                          return resolve({
                            status: false,
                            message: "Please try after some time",
                          });
                        if (cashback) {
                          var newTrasaction = new Transaction({
                            CashbackWalletId: cashback._id,
                          });
                          newTrasaction.save(async (error, transaction) => {
                            if (error)
                              return resolve({
                                status: false,
                                message: "Please try after some time",
                              });
                            return resolve({
                              status: true,
                              data: { cashback, transaction },
                              message: "cashback has been created",
                            });
                          });
                        }
                        return resolve({
                          status: true,
                          data: cashback,
                          message: "cashback has been created",
                        });
                      });
                    }
                  );
                }
              });
            }
          }
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },

  getprofilebyloginid: async (id) => {
    console.log(id);
    return new Promise(async (resolve) => {
      try {
        CustomerProfile.find({ login: { _id: id } })
          .populate("city", "id cityName")
          .populate(
            "locality",
            "id locality availability morning morningtime evening eveningtime"
          )
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
                message: "customer profile retrieved successfully",
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

  updatecoupancode: async (Data) => {
    return new Promise(async (resolve) => {
      console.log(Data);
      try {
        CustomerProfile.findOne({ login: Data.login }).exec((err, data) => {
          console.log("first", data);
          if (data) {
            CustomerProfile.findOne({
              coupanCode: { $in: Data.coupancode },
            }).exec((err, datas) => {
              console.log("datas", datas, Data.coupancode);
              if (datas) {
                return resolve({
                  status: true,
                  message: "coupanCode is already created !",
                  data: datas,
                });
              } else {
                CustomerProfile.findOneAndUpdate(
                  { _id: data._id },
                  {
                    login: data.login,
                    username: data.username,
                    phone: data.phone,
                    houseno: data.houseno,
                    address: data.address,
                    city: data.city,
                    locality: data.locality,
                    ringtheBell: data.ringtheBell,
                    slottime: data.slottime,
                    refercode: data.refercode,
                    refercount: data.refercount,
                    coupanCode: Data.coupancode,
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "login details  is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "coupan details is updating failed !",
                      data: data,
                    });
                  }
                });
              }
            });
          } else {
            return resolve({
              status: false,
              message: "Something is wrong",
            });
          }
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },
};
