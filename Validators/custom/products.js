const Products = require ('../../products.json')
    , { get }   = require ('lodash');

const isValidProduct = (id) => {
    const product = Products.filter((val) => val ? val['id'] === Number(id) : null);

    const getProduct = get(product, '0', null);

    if(!getProduct) {
        throw new Error ('Product is not valid');
    }

    return getProduct;
}

module.exports = { isValidProduct }