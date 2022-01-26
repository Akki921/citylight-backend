const Product = require("../models/Product");
const { populate } = require("../models/Wallet");

let product;
exports.createProduct = (req, res) => {
  const {
    productName,
    description,
    category,
    collectio,
    availableFor,
    sku,
    tags,
    productImage,
    thumbnail,
  } = req.body;
  console.log(" req.body,", req.body);
  if (productImage.length > 0 && thumbnail.length == 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      thumbnail,
      tags,
      sku,
    });
  } else if (productImage.length == 0 && thumbnail.length > 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      productImage,
      tags,
      sku,
    });
  } else if (productImage.length > 0 && thumbnail.length > 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      thumbnail,
      productImage,
      tags,
      sku,
    });
  } else {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      tags,
      sku,
    });
  }

  product.save((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      return res.status(200).json({ data });
    }
  });
};

exports.getproduct = async (req, res) => {
  Product.find({})
    .populate("category", "CategoryName Description")
    .exec((error, Product1) => {
      if (error)
        return res.status(400).json({
          status: false,
          message: "Please try after some time" + error,
        });
      if (Product1) {
        return res.status(200).json({
          status: true,
          data: Product1,
          message: "Product get successfully.",
        });
      }
    });
};

exports.updateproduct = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const {
        id,
        productName,
        description,
        category,
        collectio,
        availableFor,
        sku,
        tags,
        productImage,
        thumbnail,
      } = req.body;

      console.log(
        "near try" + id,
        productName,
        description,
        category,
        collectio,
        availableFor,
        sku,
        tags,
        productImage,
        thumbnail
      );
      if (thumbnail !== undefined && productImage === undefined) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            thumbnail: thumbnail,
            tags: tags,
            sku: sku,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product update successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not update successfully.",
            });
          }
        });
      } else if (thumbnail == undefined && productImage !== undefined) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            productImage: productImage,
            tags: tags,
            sku: sku,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product update successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not update successfully.",
            });
          }
        });
      } else if (thumbnail !== undefined  && productImage !== undefined) {
        Product.findOneAndUpdate(
          { _id: id },
                {
                  productName: productName,
                  description: description,
                  category: category,
                  availableFor: availableFor,
                  collectio: collectio,
                  thumbnail: thumbnail,
                  productImage: productImage,
                  tags: tags,
                  sku: sku,
                },
                { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    console.log(data);
                      return res.status(200).json({
                        status: true,
                        data: data,
                        message: "Product get successfully.",
                      });
                    } else if (err) {
                      return res.status(200).json({
                        status: true,
                        data: data,
                        message: "Product not get successfully.",
                      });
                    }
                  });
      } else {
        Product.findOneAndUpdate(
        { _id: id },
              {
                productName: productName,
                description: description,
                category: category,
                availableFor: availableFor,
                collectio: collectio,
                tags: tags,
                sku: sku,
              },
              { new: true, upsert: true }
              ).exec((err, data) => {
                if (data) {
                  console.log(data);
                    return res.status(200).json({
                      status: true,
                      data: data,
                      message: "Product get successfully.",
                    });
                  } else if (err) {
                    return res.status(200).json({
                      status: true,
                      data: data,
                      message: "Product not get successfully.",
                    });
                  }
                });
    } 
   }
  catch (err) {
        return res.status(200).json({
          status: false,
          message: "Please try after some time" + err,
        });
      }
    });
  }
  //   try {
  //     let rests = Product.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         productName: productName,
  //         description: description,
  //         category: category,
  //         availableFor: availableFor,
  //         collectio: collectio,
  //         thumbnail: thumbnail,
  //         productImage: productImage,
  //         tags: tags,
  //         sku: sku,
  //       },
  //       { new: true, upsert: true }
  //       ).exec((err, data) => {
  //         if (data) {
  //           console.log(data);
  //             return res.status(200).json({
  //               status: true,
  //               data: data,
  //               message: "Product get successfully.",
  //             });
  //           } else if (err) {
  //             return res.status(200).json({
  //               status: true,
  //               data: data,
  //               message: "Product not get successfully.",
  //             });
  //           }
  //         });
  //   } catch (err) {
  //     return res.status(200).json({
  //       status: false,
  //       message: "Please try after some time" + err,
  //     });
  //   }
  // });
//};
