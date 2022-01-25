const Router = require('express')
const router = new Router()
const branchController = require('../controllers/branchController')
const branchMiddleware = require('../middlewaree/branchMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')


router.post('/post', roleMiddleware(), branchMiddleware, branchController.createBranch)
router.post('/update', roleMiddleware(), branchMiddleware, branchController.updateBranch)
router.delete('/delete', roleMiddleware(), branchController.deleteBranch)
router.post('/get', roleMiddleware(),  branchController.getBranch)

module.exports = router
