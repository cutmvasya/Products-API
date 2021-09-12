const Categories = require ('../category.json')
    , fs = require ('fs')
    , { get } = require ('lodash')
    , { isValidCategory } = require ('../Validators/custom/categories');

/**
 * Get All Categories
 */

const getCategories = (req, res) => {
    if(!Categories) {
        return res.status(404).json({ success: { status: false, message: 'There is no data in Category'}, data: null });
    }
    return res.status(200).json({ success: { status: true, message: 'Success'}, data: Categories})
}

/**
 * get category by id
 */

const getCategoryById = (req, res) => {
    const { id } = req.params;

    const category = isValidCategory(id);

    if(category.length === 0) {
        return res.status(422).json({ success: {status: false, message: `Cannot find category with ID ${id}`}, data: null });
    }

    const result = get(category, '0', null);

    return res.status(200).json({ success: {status: true, message: 'Success'}, data: category });
}

module.exports = {
    getCategories, 
    getCategoryById
}