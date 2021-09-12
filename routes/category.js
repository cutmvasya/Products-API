const CategoryController = require ('../controllers/categoryControllers')
    , express = require ('express')
    , router = express.Router();

router.get('/', CategoryController.getCategories);
router.post('/:id', CategoryController.getCategoryById);

module.exports = router;