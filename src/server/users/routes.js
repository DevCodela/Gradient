import { Router } from 'express'
import * as Controller from './controllers'

const router = new Router()

router.route('/logout').get(Controller.logout)

export default router
