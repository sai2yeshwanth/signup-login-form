import { Router, Request, Response } from 'express'
import User, { userInput } from '../db/models/Users'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const authRouter = Router()

// email valid
let emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');



//create a user or signup
authRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const reqData = req.body
        //adding validation
        if (!reqData.user_name || reqData.user_name.length === 0) {
            return res.status(400).send({
                message: "Please enter a user name"
            })
        }
        if (!reqData.password || reqData.password.length === 0) {
            return res.status(400).send({
                message: "Please enter a password"
            })
        }
        if (!reqData.email || reqData.email.length === 0) {
            return res.status(400).send({
                message: "Please enter an email address"
            })
        }

        if (emailValidation.test(reqData.email.toLowerCase()) == false) {
            return res.status(404).send({ message: "please enter Validate email" })
        }

        // check user already exist or not
        const checkUser = await User.count({ where: { user_name: reqData.user_name || reqData.email } })
        if (checkUser > 0) {
            return res.status(400).send({
                message: "User already exist"
            })
        }

        //add new user and return 201
        const salt = await bcrypt.genSalt(10);


        const createUser = {
            user_name: reqData.user_name,
            password: await bcrypt.hash(reqData.password, salt),
            email: reqData.email.toLowerCase(),

        }
        //creating new user
        const newUser: userInput = await User.create(createUser)
        return res.status(201).send({ message: "successfully created a user" })
    }
    catch (error: any) {
        return res.status(500).send({ message: `error in creating a new user : ${error}` })
    }
})

// login
authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        //taka a data from req.body
        const reqData = req.body

        //take email from reqData and validate the email
        const email = reqData.email ? reqData.email.toLowerCase() : ""
        if (email.length === 0) {
            return res.status(404).send({ message: "please enter the email" })
        }

        //take password from reqData and validata the password
        const password = reqData.password ? reqData.password : ""
        if (password.length === 0) {
            return res.status(404).send({ message: "please enter the password" })
        }

         // chekuser or Not
         const chekUser = await User.findOne({ where: { email: email } })
         if (!chekUser) {
             return res.status(500).send({
                 message: "enter valid email"
             })
         }

         const password_valid = await bcrypt.compare(req.body.password, chekUser.password);
        if (!password_valid) {
            return res.status(500).send({
                message: "enter valid password"
            })
        }

        if ((password_valid) && (chekUser.email === reqData.email)) {
            let token = jwt.sign(
                { id: chekUser?.id, username: chekUser.user_name, email: chekUser.email},

                "SECRET_ACCESS_KEY",
                { expiresIn: "1h" }
            );
            return res.send({
                message: "success", token: token
            })
        }


        return res.status(200).send({ message: "successfully user logged in" })
    }
    catch (error: any) {
        return res.status(500).send({ message: `error in creating a new user : ${error}` })
    }
})

export default authRouter