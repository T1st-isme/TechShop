// Import the Category model
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import slugify from "slugify";

function categoriesList(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: categoriesList(categories, cate._id),
    });
  }

  return categoryList;
}

// Define the controller functions
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).exec();
  if (categories) {
    const categoryList = categoriesList(categories);
    res.status(200).json({ categoryList });
  } else {
    return res.status(400).json({ error: "Không tìm thấy!!!" });
  }
});

//Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  const cateObj = { name: name, slug: slugify(name) };
  try {
    if (!cateObj.name) {
      res.status(401).json({ message: "Tên danh mục không được trống!!!" });
    }
    const existingCategory = await Category.findOne({ name: cateObj.name });
    if (existingCategory) {
      res.status(201).send({
        success: true,
        message: "Tên danh mục đã tồn tại!!!",
      });
    }
    if (req.body.parentId) {
      cateObj.parentId = req.body.parentId;
    }
    const newCategory = await Category.create(cateObj);
    res.status(201).json({
      success: true,
      message: "Tạo danh mục thành công!!!",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
//Find category by Id
const getCategoryByName = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Xóa danh mục thành công.",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Lỗi. Không tìm thấy danh mục!!!",
      error,
    });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryByName,
  updateCategoryById,
  deleteCategory,
};
