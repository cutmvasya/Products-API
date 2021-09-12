const Categories = require ('../../category.json')
    , { get }   = require ('lodash');

const isValidCategory = (id) => {
    const category = Categories.filter((val) => val ? val['id'] === Number(id) : null);

    const getCategory = get(category, '0', null);

    if(!getCategory) {
        throw new Error('Category is not valid');
    }

    return getCategory;
}

module.exports = { isValidCategory };