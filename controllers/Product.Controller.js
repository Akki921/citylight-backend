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
      if (thumbnail.length > 0 && productImage.length == 0) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName,
            description,
            category,
            availableFor,
            collectio,
            thumbnail,
            tags,
            sku,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "Product is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "Product updating failed !",
              data: data,
            });
          }
        });
      } else if (thumbnail.lenght == 0 && productImage.lenght > 0) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName,
            description,
            category,
            availableFor,
            collectio,

            productImage,
            tags,
            sku,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "Product is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "Product updating failed !",
              data: data,
            });
          }
        });
      } else if (thumbnail.length > 0 && productImage.length > 0) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName,
            description,
            category,
            availableFor,
            collectio,
            thumbnail,
            productImage,
            tags,
         
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "Product is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "Product updating failed !",
              data: data,
            });
          }
        });
      } else {
        console.log(req.body);
        let rests = Product.findOneAndUpdate(
          { _id: id },
          {
            productName,
            description,
            category,
            availableFor,
            collectio,
            tags,
            sku,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "Product is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "Product updating failed !",
              data: data,
            });
          }
        });
      }
      
    } catch (error) {
      return resolve({
        status: false,
        message: "Please try after some time" + error,
      });
    }
  });
};
