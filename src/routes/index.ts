import { Router, Request, Response } from 'express'
import authRouter from './authUser.route'


const routes = Router()
routes.use('/auth', authRouter) 

export default routes