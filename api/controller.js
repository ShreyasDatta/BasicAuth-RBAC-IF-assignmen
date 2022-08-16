const jwt = require('jsonwebtoken');
const User = require('../models/registerModel')
const Student = require('../models/registerStudentModel')
const bcrypt = require('bcrypt');
const { create } = require('../models/registerModel');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    serverCheck: (req, res) => {
        return res.status(200).json({
            success: true,
            message: "Server running .."
        });
    },
    //signup
    signup: async (req, res) => {
        try {
            const {
                email,
                password,
                role,
                // name,
                first_name,
                last_name,
                mobile
            } = req.body
            const user = await User.findOne({
                email
            });
            console.log(user);

            if (user) return res.status(403).json({
                success: 0,
                message: 'Email already exist'
            });
            const hashedPassword = await hashPassword(password);
            const newUser = new User({
                email,
                password: hashedPassword,
                role: role || "basic",
                first_name: first_name,
                last_name: last_name,
                mobile: mobile
                // name: first_name + " " + last_name
            });
            console.log("newUser "+newUser)
            const accessToken = jwt.sign({
                userId: newUser._id,
                role: newUser.role,
                email: newUser.email,
                // name: newUser.name,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                mobile: newUser.mobile
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            newUser.accessToken = accessToken;
            await newUser.save();
            return res.status(200).json({
            data: newUser,
                accessToken
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    },
    //sign in
    signin: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                email
            });
            // console.log(user);
            if (!user) return res.status(404).json({
                success: 0,
                message: 'Email does not exist'
            });
            const validPassword = await validatePassword(password, user.password);
            if (!validPassword) return res.status(503).json({
                success: 0,
                message: 'Password is not correct'
            });
            const accessToken = jwt.sign({
                userId: user._id,
                role: user.role,
                email: user.email,
                // name: user.name
                first_name: user.first_name,
                last_name: user.last_name,
                mobile: user.mobile
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            await User.findByIdAndUpdate(user._id, {
                accessToken
            })
            res.status(200).json({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    // name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                    _id: user._id
                },
                accessToken
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    },
    //getusers
    getusers: async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json({
                data: users
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    },
    //getuser by id
    getuser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if (!user) return next(new Error('User does not exist'));
            res.status(200).json({
                data: user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    },
    //update user by admin
    updateuser: async (req, res, next) => {
        try {
            const update = req.body
            const userId = req.params.userId;
            await User.findByIdAndUpdate(userId, update);
            const user = await User.findById(userId)
            res.status(200).json({
                data: user,
                message: 'User has been updated'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    },
    studentCreate: async (req, res) => {
        try {
            const {
                name,
                user_id

            } = req.body
            const user = await Student.findOne({
                name
            });
            console.log(user);

            /*
            if (user) return res.status(403).json({
                success: 0,
                message: 'Email already exist'
            });
            const hashedPassword = await hashPassword(password);
            */
            const newStudent = new Student({
                name: name,
                userId: user_id

            });
            console.log("newStudent "+newStudent)
            const accessToken = jwt.sign({
                studentId: newStudent._id,
                userId: newStudent.userId,
                name: newStudent.name
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            newStudent.accessToken = accessToken;
            await newStudent.save();
            return res.status(200).json({
            data: newStudent,
                accessToken
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Error Message",
            });
        }
    }
};