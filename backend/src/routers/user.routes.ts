import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router(); 


userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/findUser').post(
    (req, res) => new UserController().findUser(req, res)
)

userRouter.route('/updatePassword').post(
    (req, res) => new UserController().updatePassword(req, res)
)

userRouter.route('/getNoUserImage').get(
    (req, res) => new UserController().getNoUserImage(req, res)
)




export default userRouter; 
