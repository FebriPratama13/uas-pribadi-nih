const { filterUsersResponse } = require('../../utils/userUtils');
const userService = require('../services/userService');


const getAllUser = async (req, res) => {
    const users = await userService.getAllUser();
    try {
        res.status(200).json({
            code: '200',
            message: 'ok!',
            data: users
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}


const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json({
            code: 200,
            message: 'ok!',
            data: filterUsersResponse(user)
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
        
    }
}
const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userService.getUserByUsername(username);
        res.status(200).json({
            code: 200,
            message: 'ok!',
            data: filterUsersResponse(user)
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
        
    }
}

const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const fotoProfile = req.file ? `/public/images/users/${req.file.filename}` : '/public/images/users/profile.png';
    try {
        const user = await userService.createUser({
            username, password, email, foto_profil: fotoProfile
        });
        res.status(201).json({
            code: 201,
            message: 'User created successfully',
            data: filterUsersResponse(user)
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

const createAdminUser = async (req, res) => {
    const { username, password, email, role } = req.body;
    const fotoProfile = req.file ? `/public/images/users/${req.file.filename}` : null;
    try {
        const user = await userService.createUser({
            username, password, email, foto_profil: fotoProfile, role
            }, true);
        res.status(201).json({
            code: 201,
            message: 'Admin created successfully',
            data: filterUsersResponse(user)
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    } 
}




module.exports = {
    getAllUser,
    getUserByEmail,
    getUserByUsername,
    createUser,
    createAdminUser
}