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
userRouter.route('/fetchAllUsers').get(
    (req, res) => new UserController().fetchAllUsers(req, res)
)
userRouter.route('/fetchAllObligations').get(
    (req, res) => new UserController().fetchAllObligations(req, res)
)
    
userRouter.route('/getAdmin').get(
    (req, res) => new UserController().getAdmin(req, res)
)
    
userRouter.route('/getObligations').post(
    (req, res) => new UserController().getObligations(req, res)
)

userRouter.route('/addUser').post(
    (req, res) => new UserController().addUser(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res) => new UserController().deleteUser(req, res)
)

userRouter.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)



export default userRouter; 
