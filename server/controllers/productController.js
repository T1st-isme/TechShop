import slugify from "slugify";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import APIFeatures from "../Utils/apiFeatures.js";
import uploader from "../config/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
//Filtering, sorting and paginating
// const getProducts = asyncHandler(async (req, res) => {
//   const queries = { ...req.query };
//   const removeFields = ["sort", "limit", "page"];
//   removeFields.forEach((el) => delete queries[el]);
//   let queryStr = JSON.stringify(queries);
//   queryStr = queryStr.replace(
//     /\b(gt|gte|lt|lte|in)\b/g,
//     (match) => `$${match}`
//   );
//   let query = JSON.parse(queryStr);
//   if (queries?.name) {
//     query.name = { $regex: queries.name, $options: "i" };
//   }
//   let queryCmd = Product.find(query).populate("category", "-slug");

//   //Sorting
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(",").join(" ");
//     queryCmd = queryCmd.sort(sortBy);
//   } else {
//     queryCmd = queryCmd.sort("-createdAt");
//   }
//   //Pagination
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Product.countDocuments();
//   queryCmd = queryCmd.skip(startIndex).limit(limit);

//   //Pagination result
//   const pagination = {};
//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit,
//     };
//   }
//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit,
//     };
//   }

//   //Field limiting
//   if (req.query.fields) {
//     const fields = req.query.fields.split(",").join(" ");
//     queryCmd = queryCmd.select(fields);
//   } else {
//     queryCmd = queryCmd.select("-__v");
//   }

//   //Executing query
//   try {
//     const products = await queryCmd.exec();
//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       pagination,
//       data: products ? products : "Không tìm thấy sản phẩm!!!",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: "Lỗi Server!!!",
//       err,
//     });
//   }
//   // const products = await Product.find().select("image name price");
//   // return res.status(200).json({
//   //   success: products ? true : false,
//   //   data: products ? products : "Không tìm thấy sản phẩm!!!",
//   // });
// });

const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, sort, resPerPage = 12 } = req.query;

  const productsCount = await Product.countDocuments();

  const startIndex = (page - 1) * resPerPage;
  const endIndex = page * resPerPage;

  const apiFeatures = new APIFeatures(
    Product.find().populate("category"),
    req.query
  )
    .search()
    .filter()
    .sort(sort);

  apiFeatures.pagination(resPerPage);
  const products = await apiFeatures.query
    .skip(startIndex)
    .limit(resPerPage)
    .exec();

  const filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    productsCount,
    totalPages: Math.ceil(productsCount / resPerPage),
    currentPage: page,
    resPerPage,
    totalProducts: productsCount,
    filteredProductsCount,
    products,
  });
});

const AdGetProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).populate("category");
  return res.status(200).json({
    success: product ? true : false,
    data: product ? product : "Không tìm thấy sản phẩm!!!",
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductByName = asyncHandler(async (req, res) => {
  const ndf = "-createdAt -updatedAt -__v";
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category", `-slug ${ndf}`)
    .select(ndf);
  return res.status(200).json({
    success: product ? true : false,
    data: product ? product : "Không tìm thấy sản phẩm!!!",
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.status(200).json({
    success: product ? true : false,
    data: product ? product : "Không tìm thấy sản phẩm!!!",
  });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin!!!" });
  }
  if (req.body && req.body.name) {
    req.body.slug = slugify(req.body.name);
    req.body.proImg = req.files.map((file) => {
      return { img: file.path };
    });
  }
  console.log(req.body.proImg);

  // Upload image to Cloudinary
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    success: newProduct ? true : false,
    data: newProduct ? newProduct : "Thêm sản phẩm không thành công!!!",
  });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  if (req.body && req.body.name) {
    req.body.slug = slugify(req.body.name);
    req.body.proImg = req.files.map((file) => {
      return { img: file.path };
    });
  }
  console.log(req.body.proImg);
  const updateProduct = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  res.status(201).json({
    success: updateProduct ? true : false,
    data: updateProduct
      ? updateProduct
      : "Cập nhật sản phẩm không thành công!!!",
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const delProduct = await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: delProduct ? true : false,
    data: delProduct ? delProduct : "Xóa sản phẩm không thành công!!!",
  });
});

const uploadImage = asyncHandler(async (req, res) => {
  console.log(req.file);
  return res.status(200).json({
    success: true,
    message: "Upload image successfully!!!",
    data: req.file,
  });
});

export {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getProductByID,
  AdGetProducts,
};