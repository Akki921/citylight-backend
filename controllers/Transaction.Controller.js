
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

module.exports = {
  //register new Wallet


 
  
 
  getAllTransaction: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Transaction.find(
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

 
};
