const Router = require('express')
const router = new Router()
const branchController = require('../controllers/branchController')
const branchMiddleware = require('../middlewaree/branchMiddleware')


router.post('/post', branchMiddleware, branchController.createBranch)
router.post('/update', branchMiddleware, branchController.updateBranch)
router.delete('/delete', branchController.deleteBranch)
router.post('/get', branchController.getBranch)

module.exports = router
