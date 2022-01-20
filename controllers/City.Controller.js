
const City = require("../models/City");
const CityAvailability = require("../models/CityAvailability");
module.exports = {

  createCity: async (cityData) => {
    return new Promise(async (resolve) => {
      try {
            City.findOne({"cityName": cityData.cityName }
         )
          .exec((err, data) => {         
           
            if (data)
            {
              return resolve({
                status: true,
                message: "City is already insert !",
                data:data,
              });
            }else{
            var newCity = new City({
              cityName: cityData.cityName,
              createdDate: new Date(),
              
            });
            newCity.save(async (error, City) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(City){
              return resolve({
                status: true,
                data: City,
                message: "City has been created",
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

  getAllCity: async () => {
    return new Promise(async (resolve) => {
      try {
        City.find({}, async (err, data) => {
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
