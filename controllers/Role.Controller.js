const Role = require("../models/Role");


module.exports = {
  //register new user
  createRole: async (roleData) => {
    return new Promise(async (resolve) => {
      try {
        Role.findOne(
          {
            roleName: roleData.roleName,
          },
          async (err, data) => {
            if (err)
              return resolve({
                status: false,
                message: "Please try after some time(while finding role)"+err,
              });
            if (data)
              return resolve({
                status: false,
                message: "Role Name is already Present",
              });
            var newRole = new Role({
              roleName: roleData.roleName,
              moduleData:roleData.moduleData,
              CreatedDate: new Date(),
            });
            newRole.save(async (error, data) => {
              if (error){
                return resolve({
                  status: false,
                  message: "Please try after some time(after create)"+error,
                });}
                // if(role){
                //   var permissonrole=new PermissionRoleMapping();
                //   permissonrole.RoleId=role._id;

                //   RoleData.PermissionData.forEach(function(obj) {
                //     permissonrole.PermissionData.push(obj);
                  
                //   });
                  
            
                //   // console.log(permissonrole);
                  
                 
                
                 
                //   permissonrole.save(async(error,permissionrole)=>{
                    
                //     if(error){
                //       return resolve({
                //         status: false,
                //         message: "Please try after some time",
                //       });
                //     }else if(permissionrole){

                //       return resolve({status:false,message:"role with permission created successfully!",
                //     data:{RoleData}});
                //     }

                //   });
                // }
              
                if (data)
                return resolve({
                  status: true,
                  data: data,
                  message: "Role Created successfully",
                });
            });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time(in catch)"+error,
        });
      }
    });
  },


  getRole: async () => {
    return new Promise(async (resolve) => {
      try {
      Role.find({}).populate("moduleData.moduleId","moduleName").exec((err,data)=>{
            if (err)
                return resolve({
                  status: false,
                  message: "Please try after some time"+err,
                });
              if (data)
                return resolve({
                  status: true,
                  data: data,
                  message: "Roles retrieved successfully",
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


  deleteRole: async (id) => {
    return new Promise(async (resolve) => {
      try {
      Role.findOneAndDelete({_id:id}).exec((err,data)=>{
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

//   getAllRoles:() => {
//     return new Promise((resolve) => {
//       try {
//         Role.find({},(err, data) => {
//           if (err)
//             return resolve({
//               status: false,
//               message: "Please try after some time",
//             });
//           if (data){
            
           
//             let  completearray=[];
           
//             for (var i=0; i<data.length; i++){
//               let insidemodule=[];
            
              
//            PermissionRoleMapping.findOne({RoleId:data[i]._id},(error,permissionrole)=>{
             
//               if(permissionrole){
                
//                 for (var k=0; k<permissionrole.PermissionData.length; k++){
                
//                 Permission.findOne({_id:permissionrole.PermissionData[k].PermissionId},(eror,moduled)=>{
//                   if(moduled){
//                      insidemodule.push(moduled);
//                     console.log("hi"+insidemodule);
//                   }else{
//                     return resolve({
//                       status: false,
//                       message: "Please try after some time",
//                     });
//                   }

//                 }) ;
//               }

//               }
//             });
//  console.log(insidemodule);
//           if(insidemodule.length>0)  {
//         completearray.push({  
//               "_id":data[i]._id,
//               "RoleName":data[i].RoleName,
//               "PermissionData":insidemodule
//             });
//           }
           


//           }
//           return resolve({
//             status: false,
//             message: "get all role with modules",
//             data:completearray
//           });

//           }else{return resolve({
//             status: false,
//             message: "Please try after some time",
//           });}
           
//         });
//       } catch (error) {
//         return resolve({
//           status: false,
//           message: "Please try after some time",
//         });
//       }
//     });
//   },




//   getallrolewithpermission:async()=>{
    
//   },
};
