const { ObjectId } = require("mongodb");
const AddressSlip = require("../models/AddressSlip");

module.exports = {
  createAddressSlip: async (Data) => {

    return new Promise(async (resolve) => {
   console.log(Data);
      try {
          let test=[];
          for(let i = 0; i < Data.slipdata.length; i++) {
           test.push( Data.slipdata[i].subNo)
        }
        console. log( test);
       AddressSlip.find({ 'subNo':{$in:test}}).exec( async(err, data) => {
           console.log('first',data);
           if (data[0] === undefined) {
             let dd = await AddressSlip.insertMany(Data.slipdata);
       // console.log('dd0',dd);
        if (dd) {
          return resolve({
            status: true,
            data: dd,
            message: "Address Slip has been created",
          });
        }
          } 
          else {
            let dd = await AddressSlip.updateMany();
            // console.log('dd0',dd);
             if (dd) {
               return resolve({
                 status: true,
                 data: dd,
                 message: "Address Slip has been Updated",
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

  getAllSlip: async () => {
    return new Promise(async (resolve) => {
      try {
        AddressSlip.find({}, async (err, data) => {
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
