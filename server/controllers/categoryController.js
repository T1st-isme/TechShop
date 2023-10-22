// Import the Category model
import Category from "../models/categoryModel.js";
import slugify from "slugify";

// Define the controller functions
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Lỗi danh mục!!!",
    });
  }
};
//Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(401).json({ message: "Tên danh mục không được trống!!!" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(201).send({
        success: true,
        message: "Tên danh mục đã tồn tại!!!",
      });
    }
    const newCategory = await Category.create({ name, slug: slugify(name) });
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
      message: "Get SIngle Category SUccessfully",
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
