import express from 'express'
import {getProducts} from "../controllers/Product"
const router = express.Router()


// define the about route
router.get('/', getProducts)

module.exports = router