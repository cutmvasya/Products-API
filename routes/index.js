const express = require ('express')
    , router  = express.Router()
    , productRoutes = require ('./product')
    , categoryRoutes = require ('./category')

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes)

module.exports = router;