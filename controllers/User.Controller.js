// const { registerValidation, loginValidation } = require("../validation");
const User = require("../models/User");
const UserRoleMapping = require("../models/UserRoleMapping");
const Role=require("../models/Role");
const mongoose = require("mongoose");
module.exports = {
  //register new user
  createUser: async (req) => {
     console.log("req,",req )
    return new Promise(async (resolve) => {
      try {
        var emailData = await User.findOne({
          email: req.email,mobile:req.mobile,
        });
        if (emailData?._id != req._id && emailData?._id != null)
          return resolve({
            status: false,
            message: "Email/phone is already used",
          });
        if (req._id != null && req._id != "") {
          var user = await User.findOne({
            _id: mongoose.Types.ObjectId(UserData._id),
          });
          if (user) {
            user.Username = req.Username;
            user.mobile=req.mobile
            user.email = req.email;
            user.modifiedDate = new Date();
            user.modifiedBy = 0;
            user = await user.save();
            var oldUserRoles = UserRoleMapping.updateMany(
              { UserId: user._id },
              { isDeleted: 1 }
            );
            
            var roleMapping = [];
            req.roles.forEach((role) => {
              roleMapping.push(
                new UserRoleMapping({
                  RoleId: role,
                  UserId: user._id,
                  createdDate: new Date(),
                  createdBy: 0,
                })
              );
            });
            await UserRoleMapping.insertMany(roleMapping);
            
            return resolve({
              status: true,
              data: user,
              message: "User has been Updated",
            });
          }
        } else {
          var user = new User({
            Username: req.Username,
            mobile: req.mobile,
            email: req.email,
            password: req.password,
            createdDate: new Date(),
            createdBy: 0,
          });
          user = await user.save();
          var roleMapping = [];
          req.roles.forEach((role) => {
            console.log("first",role)
            roleMapping.push(
              new UserRoleMapping({
                RoleId: role,
                UserId: user._id,
                createdDate: new Date(),
                createdBy: 0,
              })
            );
          });
          await UserRoleMapping.insertMany(roleMapping);
          if(user){
            
            console.log("user",user)
            UserRoleMapping.find({ UserId: user._id }, (err, userRoleMapping) => {
              if (err) {
                resolve({
                  status: false,
                  message: "Please try after some time"+err,
                });
              }
              if (userRoleMapping){
               console.log("userRoleMapping",userRoleMapping)
                Role.find({ _id: userRoleMapping[0].RoleId }, (err, role) => {
                  if (err) {
                    resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  }
                  if (role){
                   console.log("final role",role)
                    return resolve({
                      status: true,
                      message: "User has been successfully created!",
                      userid: user,
                      roledata:role,
                    });
                  }
                });
                
               
              }
            });


           

            
          }
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time ",
        });
      }
    });
  },

  getAllUser: async () => {
    return new Promise(async (resolve) => {
      try {
        var userDataList = await User.find({ isDeleted: 0 }).select(
          "-password"
        );
        if (userDataList)
          return resolve({
            status: true,
            data: userDataList,
            message: "Data retrieved successfully",
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  getSingleUser: async (id) => {
    return new Promise(async (resolve) => {
      try {
        var userData = await User.findOne({ _id: id }).select(
          "_id Name phoneno email password"
        );
        var roles = await UserRoleMapping.find({ UserId: id }).select(
          "RoleId -_id"
        );
        var model = new Object();
        model.userData = userData;
        model.roles = roles;
        if (userData)
          return resolve({
            status: true,
            data: model,
            message: "Data retrieved successfully",
          });
      } catch (error) {
        resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  deleteUser: async (id) => {
    return new Promise(async (resolve) => {
      try {
        User.findByIdAndUpdate(id, { isDeleted: 1 }, async (err, data) => {
          if (err) {
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          }
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "User deleted successfully.",
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

  updateUser: async (id, UserData) => {
    return new Promise(async (resolve) => {
      try {
        User.findByIdAndUpdate(id, { isDeleted: 0 },async (err, data) => {
          if (err) {
            resolve({
              status: false,
              message: "Please try after some time1"+err,
            });
          }
          if (data)
            resolve({
              status: true,
              data: UserData,
              message: "Data Update successfully",
            });
        });
      } catch (error) {
        resolve({
          status: false,
          message: "Please try after some time2"+error,
        });
      }
    });
  },

  loginUser: async (email, password) => {
    return new Promise(async (resolve) => {
      try {
        var user = await User.findOne({
          email: email,
          password:password
        }).select(
          "_id Name phoneno email isActive isDeleted"
        );
        if (!user)
          return  resolve({
            status: false,
            message: "You are not registered!",
          });
       
          if(user){
            if (user.isDeleted == true || user.isActive == false){
              return resolve({
                status: false,
                message: "This user is not active!",
              });}else{
            UserRoleMapping.find({ UserId: user._id }, (err, userRoleMapping) => {
              if (err) {
                resolve({
                  status: false,
                  message: "Please try after some time",
                });
              }
              if (userRoleMapping){
               
                Role.find({ _id: userRoleMapping[0].RoleId }, (err, role) => {
                  if (err) {
                    resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  }
                  if (role){
                  
                    return resolve({
                      status: true,
                      message: "Success!",
                      userid: user,
                      roledata:role,
                    });
                  }
                });
                
               
              }
            });

          }
           

            
          }
        
       
      } catch (error) {
        resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },
};
