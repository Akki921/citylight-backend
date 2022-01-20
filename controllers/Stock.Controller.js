const Stock = require("../models/Stock");
//const CityAvailability = require("../models/CityAvailability");
module.exports = {
  createStock: async (stockData) => {
    return new Promise(async (resolve) => {
      console.log(stockData);
      try {
        Stock.findOne({ stockName: stockData.stockName }).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "stock is already insert !",
              data: data,
            });
          } else {
            var newStock = new Stock({
              stockName: stockData.stockName,
              category: stockData.category,
              sku: stockData.sku,
              quantity: stockData.quantity,
              deliveryToday: stockData.deliveryToday,
              deliveryTomorrow: stockData.deliveryTomorrow,
              city: stockData.city,
              productType: stockData.productType,
              tags: stockData.tags,
              createdDate: new Date(),
            });
            newStock.save(async (error, Stock) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (Stock) {
                return resolve({
                  status: true,
                  data: Stock,
                  message: "Stock has been created",
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

  

  getAllStock: async () => {
    return new Promise(async (resolve) => {
      try {
        Stock.find({})
          .populate("category", "CategoryName Description Status")
          .exec((error, data) => {
            if (error)
            return resolve({
                status: true,
                data: data,
                message: "Data retrieved successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "Data retrieved successfully",
              });
            }
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  //   editCityAvailability: async (CityData)=>{
  //     return new Promise(async (resolve) => {
  //         try {
  //           CityAvailability.findOneAndUpdate({_id:CityData._id},{ CityName: CityData.CityName,

  //             },{new:true,upsert:true}).exec((err, data) => {
  //                 if( data){
  //                     return resolve({
  //                         status: true,
  //                         message: "City Availability is updated !",
  //                         data:data,
  //                       });
  //                    }else if(err){
  //                     return resolve({
  //                         status: false,
  //                         message: "City Availability updating failed !",
  //                         data:data,
  //                       });
  //                    }
  //             });

  //         } catch (error) {
  //             return resolve({
  //               status: false,
  //               message: "Please try after some time"+e,
  //             });
  //           }
  //         });
  //   },

  updateStock: async (stockData) => {
    return new Promise(async (resolve) => {
      console.log(stockData);
      try {
        let rests = Stock.findOneAndUpdate(
            { _id: stockData.id },
            {
             stockName: stockData.categoryname,
             category: stockData.category,
             sku: stockData.sku,
             quantity: stockData.quantity,
             deliveryToday: stockData.deliveryToday,
             deliveryTomorrow: stockData.deliveryTomorrow,
             city: stockData.city,
             productType: stockData.productType,
             tags: stockData.tags,
            },
            { new: true, upsert: true }
          ).exec((err, data) => { 
            if (data) {
                return resolve({
                  status: true,
                  message: "stock is updated !",
                  data: data,
                });
              } else if (err) {
                return resolve({
                  status: false,
                  message: "stock updating failed !",
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
