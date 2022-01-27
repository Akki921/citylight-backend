
const CityAvailability = require("../models/CityAvailability");
module.exports = {

  createCityAvailability: async (cityData) => {
    return new Promise(async (resolve) => {
      console.log(cityData);
      try {
        CityAvailability.findOne({"city": cityData.id,"locality": cityData.locality }
         )
          .exec((err, data) => {         
           
            if (data)
            {
              return resolve({
                status: true,
                message: "All Data is already insert !",
                data:data,
              });
            }else{
            var newcityAvailability = new CityAvailability({
                city: cityData.city,
                locality: cityData.locality,
                availability: cityData.availability,
                morning: cityData.morning,
                evening: cityData.evening,
                morningtime: cityData.morningtime,
                eveningtime: cityData.eveningtime,
            });
            newcityAvailability.save(async (error, City) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(City){
              return resolve({
                status: true,
                data: City,
                message: "locality has been created",
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

  getAllCityAvailability: async () => {
    return new Promise(async (resolve) => {
      try {

          CityAvailability.find({"availability": true})
          .populate("city", "id cityName")
          .exec((error, data) => {
            if (error)
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "locality retrieved successfully",
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
