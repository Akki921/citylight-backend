
const CustomerProfile= require("../models/CustomerProfile");
const CityAvailability = require("../models/CityAvailability");
module.exports = {

  createCustomerProfile: async (Data) => {
    return new Promise(async (resolve) => {
      console.log(Data);
      try {
        CustomerProfile.findOne({"login": Data.login }
         )
          .exec((err, data) => {         
           
            if (data)
            {
              return resolve({
                status: true,
                message: "profile is already created !",
                data:data,
              });
            }else{
            var newprofile = new CustomerProfile({
              login: Data.login,
              username: Data.username,
              houseno: Data.houseno,
              address: Data.address,
              city: Data.city,
              locality: Data.locality,
              ringtheBell: Data.ringtheBell,
            });
            newprofile.save(async (error, data) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(data){
              return resolve({
                status: true,
                data: City,
                message: "Profile has been created",
              });
            }
            });
            }
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    });
  },

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
        CustomerProfile.find({}, async (err, data) => {
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

};
