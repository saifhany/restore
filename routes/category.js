const express = require('express');
const router =  express.Router();
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getAllCategories,
} = require("../controller/category");

//ROUTES
router
    .route("/")
    .get(protect, getCategories)
    .post(protect, categoryCreateValidator, runValidation, createCategory);

router
    .route("/:id")
    .get(protect, getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;