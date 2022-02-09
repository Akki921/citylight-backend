const CustomerLogin = require("../models/CustomerLogin");
const CityAvailability = require("../models/CityAvailability");
const { generateOTP, fast2sms } = require("../utils/otp.util");
const { options } = require("../routes/role.router");
module.exports = {
  createLogin: async (Data) => {
    return new Promise(async (resolve) => {
      console.log(Data);
      try {
        CustomerLogin.findOne({ phone: Data.phone }).exec((err, data) => {
          if (data) { 
            console.log(Data,data);
           if (Data.city === undefined &&  Data.locality === undefined ) {
            CustomerLogin.findOneAndUpdate(
              { _id: data._id },
              {
                phone:data.phone,
                phoneotp:data.phoneotp,
                city:data.city,
                locality:data.locality,
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
             console.log('inside else',Data.city);
             const otp = generateOTP(4);
            CustomerLogin.findOneAndUpdate(
              { _id: data._id },
              {
                phone:data.phone,
                phoneotp:otp,
                city:Data.city,
                locality:Data.locality,
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
           }
          } else {
            const otp = generateOTP(4);
            console.log("otp", otp);
            var newLogin = new CustomerLogin({
              phone: Data.phone,
              phoneotp:otp,
            });
            newLogin.save(async (error, Login) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (Login) {
              
                return resolve({
                  status: true,
                  data: Login,
                  message: "Login has been created",
                });
              }
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

  getAllLogin: async () => {
    return new Promise(async (resolve) => {
      try {
        CustomerLogin.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Login retrieved successfully",
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

 updateclogin: async (Data) => {
    return new Promise(async (resolve) => {
      console.log(Data);
      try {
        CustomerLogin.findOneAndUpdate(
            { _id: Data.id },
            {
             phone:Data.phone,
             phoneotp:Data.phoneotp,
             city:Data.city,
             locality:Data.locality,
            },
            { new: true, upsert: true }
          ).exec((err, data) => { 
            if (data) {
                return resolve({
                  status: true,
                  message: "CustomerLogin is updated !",
                  data: data,
                });
              } else if (err) {
                return resolve({
                  status: false,
                  message: "CustomerLogin updating failed !",
                  data: data,
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