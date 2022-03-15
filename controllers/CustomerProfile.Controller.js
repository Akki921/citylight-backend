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
