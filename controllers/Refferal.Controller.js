const Refferal = require("../models/Refferal");
// const Login  =require("../models/CustomerLogin");
const mongoose = require("mongoose");
module.exports = {
  createRefferal: async (RefferalData) => {
     console.log("first",RefferalData);
    const { newUserDiscount, refreeDiscount } = RefferalData;
    const userdiscount = parseInt(newUserDiscount);
    const rediscount = parseInt(refreeDiscount);
    return new Promise(async (resolve) => {
      try {
        let referid=12345678;
        if (userdiscount >= 0 && rediscount >= 0) {
          Refferal.findOne({ referid:referid}).exec(
            (err, data) => {
              console.log('data',data)
              if (data) {
  
                Refferal.findOneAndUpdate(
                  { _id: data._id },
                  { newUserDiscount: userdiscount, refreeDiscount: rediscount },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "Refferal is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "Refferal updating failed !"+err,
                      data: data,
                    });
                  }
                });
              } else {
                console.log("create");
                var newRefferal = new Refferal({
                  newUserDiscount: userdiscount,
                  refreeDiscount: rediscount,
                  referid:referid,
                  CreatedDate: new Date(),
                });
                newRefferal.save(async (error, Refferal) => {
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  if (Refferal) {
                    return resolve({
                      status: true,
                      data: Refferal,
                      message: "Refferal has been created",
                    });
                  }
                })
              }
            }
          );
        } else {
          return resolve({
            status: false,
            message: "Inserted amount is should not be negative !",
            data: data,
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

  getRefferal: async () => {
    return new Promise(async (resolve) => {
      try {
        Refferal.findOne({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Somwething went Wrong",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Data retrive Successfully",
            });
        });
      } catch (error) {
        return resolve({
          ststus: false,
          message: "Please try again sometime" + error,
        });
      }
    });
  }, 
};
