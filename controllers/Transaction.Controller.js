
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

module.exports = {
  //register new Wallet


 
  
 
  getAllTransaction: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Transaction.find()
        .sort({ createdAt: -1 })
        .exec(
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

  
 
 
};
