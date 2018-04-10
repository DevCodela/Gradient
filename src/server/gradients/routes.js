import { Router } from 'express'
import * as Api from './api'

const router = new Router()

router.route('/api/gradients').post(Api.add)
router.route('/api/gradients').get(Api.list)

export default router
