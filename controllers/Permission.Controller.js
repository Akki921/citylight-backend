const Permission = require("../models/Permission");
const Role=require("../models/Role");
const PermissionRoleMapping = require("../models/PermissionRoleMapping");


module.exports = {
  createPermission: async (PermissionData) => {
    // console.log(PermissionData);
    return new Promise(async (resolve) => {
      try {
        
          Permission.findOneAndUpdate({
            PermissionName: PermissionData.PermissionName},{status:PermissionData.status,
              CreatedDate: new Date(),
              CreatedBy: 0},
              { new: true, upsert: true })
              .exec((err, data) =>{
                if(err){
                  var newPermission = new Permission({
                    PermissionName: PermissionData.PermissionName,
                    status:PermissionData.status,
                    CreatedDate: new Date(),
                    CreatedBy: 0,
                  });
                  newPermission.save(async (error, permission) => {
                    if (error)
                      return resolve({
                        status: false,
                        message: "Please try after some time 1"+error,
                      });
                      if(permission){
                        try {
                          console.log(permission);
                          PermissionRoleMapping.findOneAndUpdate({
                           PermissionId:permission._id  },{"RoleId":PermissionData.role_id,"PermissionId":PermissionData.permission_id,
                           "status":PermissionData.status}
                           ,
                           { new: true, upsert: true })
                           .exec((err, data) => {
                             if(err){
                             console.log(err);
                               var permissionRoleMapping = new PermissionRoleMapping();
                             permissionRoleMapping.RoleId = PermissionData.role_id;
                             permissionRoleMapping.PermissionId = permission._id;
                             PermissionRoleMapping.status=PermissionData.status;
                             console.log(permissionRoleMapping);
                             permissionRoleMapping.save(async (errors, permissionRoleMap) => {
                               if (errors){
                                 return resolve({
                                   status: false,
                                   message: "Please try after some time main ",
                                 });
                                }
                                 if(permissionRoleMap){
                               return resolve({
                                 status: true,
                                 data: {permissionRoleMap,permission},
      
                                 message: "permission Role has been created",
                               });
                             }
                             });
                             }else{
                              return resolve({
                                status: true,
                                data: {data,permission},
      
                                message: "permission Role has been created",
                              });
                             }
                             
                            
                           
                           });
                        
                         }catch(error){
                           return resolve({
                             status: false,
                             message: "Please try after some time 3"+error,
                           });
                         }
                      }
                    
                }
              );
                } if (data){
                    try {
                      console.log(data);
                      PermissionRoleMapping.findOneAndUpdate({
                       PermissionId:data._id  },{"RoleId":PermissionData.role_id,"PermissionId":data._id,
                       "status":PermissionData.status}
                       ,
                       { new: true, upsert: true })
                       .exec((err, datas) => {
                         if(err){
                         console.log(err);
                           var permissionRoleMapping = new PermissionRoleMapping();
                         permissionRoleMapping.RoleId = data.role_id;
                         permissionRoleMapping.PermissionId = data._id;
                         PermissionRoleMapping.status=data.status;
                         console.log(permissionRoleMapping);
                         permissionRoleMapping.save(async (errors, permissionRoleMap) => {
                           if (errors){
                             return resolve({
                               status: false,
                               message: "Please try after some time main ",
                             });
                            }
                             if(permissionRoleMap){
                           return resolve({
                             status: true,
                             data: {permissionRoleMap,data},
  
                             message: "permission Role has been created",
                           });
                         }
                         });
                         }else{
                          return resolve({
                            status: true,
                            data: {data,datas},
  
                            message: "permission Role has been created",
                          });
                         }
                         
                        
                       
                       });
                    
                     }catch(error){
                       return resolve({
                         status: false,
                         message: "Please try after some time 3"+error,
                       });
                     }
                  }
                }
              
              );
            
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time 4"+error,
        });
      }
    });
  },



  getPermission: async () => {
    return new Promise(async (resolve) => {
      try {
        Permission.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "permission retrieved successfully",
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
  getPermissionRole: async () => {
    return new Promise(async (resolve) => {
      try {
        PermissionRoleMapping.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            {
              data.forEach(element => {
                Role.find({_id:element.RoleId},async (errs,roledata)=>{
                  if(roledata){
                      Permission.find({_id:element.PermissionId},async(errss,permissiongdata)=>{
                        if(permissiongdata){
                          return resolve({
                            status: true,
                            data: {role ,permissiongdata},
                            message: "permission role successfully",
                          });

                        }else{
                          return resolve({
                            status: true,
                            message: "permission role successfully",
                        });

                      }});


                  }else{
                    return resolve({
                      status: false,
                      message: "role not found in database!",
                    });
                  }
          });
              });
              
              

            }else{
              return resolve({
                status: false,
                message: " not found in database!",
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
  applyingpermission:async(req)=>{
    
    return new Promise(async (resolve) => {
      try {
        
       PermissionRoleMapping.findOneAndUpdate({
        PermissionId:req.permission_id,RoleId:req.role_id
        },{"RoleId":req.role_id,"PermissionId":req.permission_id,"status":req.permission.status}
        ,
        { new: true, upsert: true })
        .exec((err, data) => {
          if(err){
            var permissionRoleMapping = new PermissionRoleMapping();
          permissionRoleMapping.RoleId = req.role_id;
          permissionRoleMapping.PermissionId = req.permission_id;
          permissionRoleMapping.status=req.permission.status;
          console.log(permissionRoleMapping);
          permissionRoleMapping.save(async (error, permissionRoleMap) => {
            if (error)
              return resolve({
                status: false,
                message: "Please try after some time main "+error,
              });
              if(permissionRoleMap){
            return resolve({
              status: true,
              data: permissionRoleMap,
              message: "permission Role has been created",
            });
          }
          });
          }
          if(data){
           
          return resolve({
            status: true,
            data: data,
            message: "permission Role ",
          });
        
          }
         
        
        })
     
      }catch(error){
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    })
  },
updateuserpermission:async(req)=>{
  return new Promise(async (resolve) => {
    try {
      PermissionRoleMapping.findByIdAndUpdate({ _id: req.id }, {status:req.status, isDeleted: req.isDeleted }, async (err, data) => {
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
            message: "permission role successfully.",
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
updatepermission:async(id)=>{

  Permission.findOne(
    { _id: id
    },{ isDeleted: 1 },
    async (err, data) => {
      if (err){
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
      if (data){
        return resolve({
          status: false,
          message: "update permission ",
          data:data,
        });


      }

});


},




};
