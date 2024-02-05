import express from 'express'
import {getUser} from "../controllers/User"
const router = express.Router()


// define the about route
router.get('/', getUser)

module.exports = router