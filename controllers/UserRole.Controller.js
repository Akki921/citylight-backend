const Role = require("../models/Role");
const User = require("../models/User");
const UserRoleMapping = require("../models/UserRoleMapping");

module.exports = {
  // getUserRole: async (id) => {
  //   return new Promise(async (resolve) => {
  //     try {
  //       console.log(id);
  //       User.findOne({ _id: id }, async (err, data) => {
  //         if (err) {
  //           resolve({
  //             status: false,
  //             message: "Please try after some time1",
  //           });
  //         }
  //         if (data)
  //           resolve({
  //             status: true,
  //             data: data._id,
  //             message: "Data retrieved successfully",
  //           });
  //       }).UserRoleMapping.find({ UserId: data._id }, (err, data) => {
  //         if (err) {
  //           resolve({
  //             status: false,
  //             message: "Please try after some time2",
  //           });
  //         }
  //         if (data)
  //           resolve({
  //             status: true,
  //             data: data._id,
  //             message: "Data retrieved successfully",
  //           });
  //       });
  //     } catch (error) {
  //       resolve({
  //         status: false,
  //         message: "Please try after some time3",
  //       });
  //     }
  //   });
  // },

  assignRole: async (userRoleData) => {
    return new Promise(async (resolve) => {
      try {
        UserRoleMapping.findOne({"userId": userRoleData.userId }
         )
          .exec((err, data) => {         
           
            if (data)
            {
              return resolve({
                status: true,
                message: "User is already having a permission !",
                data:data,
              });
            }else{
            var newUserRole = new UserRoleMapping({
              userId: userRoleData.userId,
              roleId: userRoleData.roleId,
              createdDate: new Date(),
              
            });
            newUserRole.save(async (error, data) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(data){
              return resolve({
                status: true,
                data: data,
                message: "UserRole has been Assigned",
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


  getUserRole: async () => {
    return new Promise(async (resolve) => {
      try {
        UserRoleMapping.find({}).populate("roleId","roleName").populate("userId","email").exec((err, data) => {
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

  editUserRole: async (userRoleData)=>{
    return new Promise(async (resolve) => {
        try {
          UserRoleMapping.findOneAndUpdate({_id:userRoleData._id},{
                userId: userRoleData.userId,
                roleId:userRoleData.roleId,
                },{new:true,upsert:true}).exec((err, data) => { 
                if( data){
                    return resolve({
                        status: true,
                        message: "UserRole has been updated !",
                        data:data,
                      });
                   }else if(err){
                    return resolve({
                        status: false,
                        message: "UserRole updating failed !",
                        data:data,
                      });
                   }
            });
           
        } catch (error) {
            return resolve({
              status: false,
              message: "Please try after some time"+e,
            });
          }
        });
  },

  deleteUserRole: async (id) => {
    return new Promise(async (resolve) => {
      try {
      UserRoleMapping.findOneAndDelete({_id:id}).exec((err,data)=>{
            if (err)
                return resolve({
                  status: false,
                  message: "Please try after some time"+err,
                });
              if (data)
                return resolve({
                  status: true,
                  message: "Role Deleted successfully",
                });
        })
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    });
  },
};
