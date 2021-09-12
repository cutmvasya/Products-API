const ProductController = require ('../controllers/productControllers')
    , express = require ('express')
    , router = express.Router();

router.get('/', ProductController.getProducts);
router.post('/:id', ProductController.getProductById);
router.delete('/:productId', ProductController.deleteProductById);

module.exports = router;