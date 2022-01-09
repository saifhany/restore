const asyncHandler = require('express-async-handler');
const Category = require('../models').Category;
const {OP} = require("sequelize");

// @desc create a category
// @route POST/api/categories
// @access private/user

exports.createCategory = asyncHandler(async (req,res)=>{
    const {name } = req.body;
    const createdCategory =await Category.create({name});
    res.status(201).json(createdCategory);
});

// @desc Get all categories with pagination
// @route 
// @access private/user
exports.getCategories = asyncHandler(async (req,res)=>{
    const pageSize =5;
    const page = Number(req.params.pageNumber) || 1;
    const Keyword = req.query.Keyword ? req.query.Keyword :null;

    let options = {
        attributes:{
            exlude:["updateAt"]
        },
        offset:pageSize * (page - 1),
        limit:pageSize ,
    };
    
    if(Keyword){
        options = {
            ...options,
            where:{
                [Op.or]:[
                    { id:{ [Op.like]:`%${Keyword}` } },
                    { name:{ [Op.like]:`%${Keyword}` } },
                ],
            },
        };
    }
    /*QUERY*/
    const count =await Category.count({...options});
    const categories = await Category.findAll({...options});
    /*RESPONSE*/
    res.json({categories,page,pages:Math.ceil(count/pageSize)});
})

// @desc  Get category by ID
// @route GET / api/categories/:id 
// @access private/user
exports.getCategory = asyncHandler(async (req,res)=>{
    const category = await Category.findByPk(req.params.id);
        if(category){
            res.status(200).json(category);
        }else{
            res.status(400);
            throw new Error("Category not found");
        }
})

//@desc     Update category
//@route    PUT /api/categories/:id
//@access   Private/user
exports.updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (category) {
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});

//@desc     Delete a category
//@route    DELETE /api/categories/:id
//@access   Private/user
exports.deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (category) {
        await category.destroy();
        res.json({ message: "Category removed" });
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});