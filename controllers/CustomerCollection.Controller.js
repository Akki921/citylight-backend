const CustomerCollection =require("../models/CustomerCollection")
const mongoose=require("mongoose");
const CustomerProfile =require("../models/CustomerProfile")
module.exports = {
  //register new CustomerCollection
  createCustomerCollection: async (CustomerCollectionData) => {
    console.log("first,",CustomerCollectionData)
    return new Promise(async (resolve) => {
      try {
        CustomerCollection.findOne(
          {
            collectionName: CustomerCollectionData.collectionName,
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
                message: "CustomerCollection is already created",
              });
            var newCustomerCollection = new CustomerCollection({
                collectionName: CustomerCollectionData.collectionName,
                selectCustomer:CustomerCollectionData.selectCustomer,
              CreatedDate: new Date(),
            });
           
            
            newCustomerCollection.save(async (error, CustomerCollection) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time"+error,
                });
              return resolve({
                status: true,
                data: CustomerCollection,
                message: "CustomerCollection has been created",
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


  createCustomerCollectionquery: async (CustomerCollectionData) => {
    return new Promise(async (resolve) => {
      console.log("dcsxz",CustomerCollectionData)
      try {
        const df =CustomerCollectionData; 
        CustomerProfile.find( async (err, data) => {
          console.log(data)
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

  getAllCustomerCollection: async () => {
    return new Promise(async (resolve) => {
      try {
        CustomerCollection.find({}, async (err, data) => {
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
};
