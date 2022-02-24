const Coupan = require("../models/Coupancode");

// post coupan api ....
exports.newCoupancode = async (req, res) => {
  const {
    coupanCode,
    applyCustomer,
    applyProduct,
    customerCollections,
    description,
    endDate,
    productCollection,
    startDate,
    discount,
    minValue,
    totalCoupanLimit,
    percustomerLimit,
  } = req.body;
  console.log("first", req.body);
  if (discount) {
    try {
      Coupan.findOne({ coupanCode: coupanCode }).exec((err, data) => {
        if (data) {
          console.log("update");
          return resolve({
            status: true,
            message: "coupan is already insert !",
            data: data,
          });
        } else {
          console.log("create");
          const couponCodeDiscount = new Coupan({
            coupanCode: coupanCode,
            discount: discount,
            applyProduct: applyProduct,
            // productCollection: productCollection,
            applyCustomer: applyCustomer,
            customerCollections: customerCollections,
            startDate: startDate,
            endDate: endDate,
            description: description,
            minValue: minValue,
            totalCoupanLimit: totalCoupanLimit,
            percustomerLimit: percustomerLimit,
          });
          couponCodeDiscount.save(async (error, coupan) => {
            if (error)
              return res.status(400).json({
                status: false,
                message: "Coupon not Code created" + error,
              });
            if (coupan) {
              return res.status(400).json({
                status: false,
                data: coupan,
                message: "Coupon Code created",
              });
            }
          });
        }
      });
      //     db.Coupancode.findOne({applyproduct});
      //     db.Coupancode.findOne({applyCustomer});
      //       if (applyProduct  === "milk"){
      //         if (applyCustomer === "individual"){
      //           db.range.aggregate({
      //             $selected_users : {
      //               id:0,
      //               individual_names: 5,
      //               result: {
      //                 $range: [$id,$individual_names]
      //               }
      //             }
      //           }
      //           )
      //         }
      //         //   if (applyCustomer === "Group"){

      //         //
      //       } else {
      //         if (applyProduct === "grociries"){
      //           return res.status(403).json({
      //             status: false,
      //             message: "oop... sorry this coupan code only applicable for milk producsts..... !",
      //           });
      //         }
      //       }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid Product id or Coupon Code...",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Something went Wrong, Discount or expiration time is invalid ",
    });
  }
};

// here is the get api for coupanCode.....
exports.getCoupan = async (req, res) => {
  Coupan.find({}).exec((error, coupanCode) => {
    if (error) {
      return res.status(400).send("the error is.... ", error);
    } else if (coupanCode) {
      return res.status(201).send(coupanCode);
    }
  });
};

exports.updatecoupan = async (req, res) => {
  const { coupanid, coupancount } = req.body;
  console.log("first", req.body);

  try {
    Coupan.findOne({ _id: coupanid }).exec((err, data) => {
      if (data) {
        console.log("data",data)
        if (data.coupanCount >= coupancount) {

          let rests = Coupan.findOneAndUpdate(
            { _id:coupanid },
            {
              coupanCode: data.coupanCode,
              discount: data.discount,
              applyProduct: data.applyProduct,
              // productCollection:data. productCollection,
              applyCustomer: data.applyCustomer,
              customerCollections: data.customerCollections,
              startDate: data.startDate,
              endDate: Date.now(),
              description: data.description,
              minValue: data.minValue,
              totalCoupanLimit: data.totalCoupanLimit,
              percustomerLimit: data.percustomerLimit,
              coupanCount: coupancount,
              isRunning: false,
            },
            { new: true, upsert: true }
          ).exec((err, data) => {
            if (data) {
              return res.status(200).json({
                status: true,
                message: "coupan is updated !",
                data: data,
              });
            } else if (err) {
              return res.status(400).json({
                status: false,
                message: "coupan updating failed !",
                data: data,
              });
            }
          });
        } else {
              let rests = Coupan.findOneAndUpdate(
          { _id: coupanid },
          {
            coupanCode: data.coupanCode,
            discount: data.discount,
            applyProduct: data.applyProduct,
            // productCollection:data. productCollection,
            applyCustomer: data.applyCustomer,
            customerCollections: data.customerCollections,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            minValue: data.minValue,
            totalCoupanLimit: data.totalCoupanLimit,
            percustomerLimit: data.percustomerLimit,
            coupanCount: coupancount,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return res.status(200).json({
              status: true,
              message: "coupan count is updated !",
              data: data,
            });
          } else {
            return res.status(400).json({
              status: false,
              message: "coupan updating failed !" + err,
            });
          }
        });
        }
      } 
      else{
        return res.status(400).json({
          status: false,
          message: "coupan not found !",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Invalid Product id or Coupon Code...",
    });
  }
};
