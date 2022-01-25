const User = require('../models/User')
const Role = require('../models/Role')
const Branch = require('../models/Branch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const {set} = require("mongoose");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async changeRole(req, res) {
        try {
            const {admin_username, username, role} = req.body;
            const user = await User.findOne({username})
            const admin = await User.findOne({admin_username})
            const newRole = await Role.findOne({role})
            if(!admin) {
                return res.status(401).json({message: 'Юзер отсутсвует'})
            }
            if(!admin.roles.includes('ADMIN') && !admin.roles.includes('MODERATOR')) {
                return res.status(406).json({message: 'Вы не являетесь админом'})
            }
            if (!newRole) {
                return res.status(400).json({message: "Данной роли не существует"})
            }
            if (!user.roles.includes(role)) {
                await user.updateOne({username:username}, { $push: {role: role}})
                return res.json({message: "Роль успешно добавлена"})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Insert error'})
        }
    }

}

module.exports = new authController()
