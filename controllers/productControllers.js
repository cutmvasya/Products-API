const Products = require ('../products.json')
    , fs         = require ('fs')
    , { get }    = require ('lodash')
    , { isValidProduct } = require ('../Validators/custom/products')

/**
 * Get All Products
 */

const getProducts = (req, res) => {
    const result = []

    Products.forEach((product) => {
        const category = Categories.filter((val) => val['id'] === product['category']);
        product['category'] = !category ? product[category] : category[0];
        result.push(product);
    });

    return res.status(422).json({ success : true, data: result });
};

/**
 * Get Products By Id
 * 
 */

const getProductById = (req, res) => {
    const { id } = req.params;

    const product = isValidProduct(id);

    if(product.length === 0) {
        return res.status(422).json({ success: {status: false, message: `Cannot find product with ID ${id}`}, data: null });
    }

    const result = get(product, '0', null);

    return res.status(200).json({ success: {status: true, message: 'Success'}, data: product });
}

/**
 * Delete Product By Id
 */

const deleteProductById = (req, res) => {
    const { productId = null } = req.params;

    const product = Products.filter((val) => val ? val['id'] != Number(productId) : {} );

    fs.writeFileSync('products.json', JSON.stringify(product), function(err) {
        if (err){
            err.message = `Product Controller, Create failed: ${err}`;
            throw err;
        }
        console.log("Success delete product");
    });

    return res.status(200).json({ success: { status: true, message: 'Success'}, data: product });
}

/**
 * Update Product
 */

const updateProductById = (req, res) => {
    const { productId = null } = req.params;

    const { name = null, price = 0, category = null, qty = 0 } = req.body;

    try{
        //find if product is valid
        const product = isValidProduct(productId);

        let i = 0;
        while(i < Products.length) {
            if(Products[i]['id'] === product['id']) {
                Products[i]['name'] = name ? name : Products[i]['name'];
                Products[i]['price'] = name ? name : Products[i]['price'];
                Products[i]['category'] = name ? name : Products[i]['category'];
                Products[i]['qty'] = name ? name : Products[i]['qty'];
            }
            i++;
        }

        return res.status(200).json({ success: { status: true, message: 'Success'}, data: Products});
    } catch(e){
        res.status(417).json({ success: { status: false, message: e.message }, data: null});
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    isValidProduct,
    create
}