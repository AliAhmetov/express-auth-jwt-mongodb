const Branch = require("../models/Branch");
const User = require('../models/User')
const Role = require('../models/Role')
const PostService = require("../services/PostService")

const hasAccess = (user) => {
    return user.roles.includes('ADMIN') || user.roles.includes('MODERATOR')
}

class branchController {
    async createBranch(req, res) {
        try {
            const data = req.body
            const name = data.name
            const image = req.files.img

            const filial = await Branch.findOne({name})
            console.log(filial)
            if (filial) {
                return res.status(400).json({message: "Филиал с таким именем уже существует"})
            }

            const post = await PostService.create(data, image)
            return res.json(post)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Insert error'})
        }
    }

    async updateBranch(req, res) {
        try {
            const data = req.body
            const name = data.name
            const inserter = data.inserter
            const image = req.files.img

            const filial = await Branch.findOne({name})
            if (!filial) {
                return res.status(400).json({message: "Филиал отсутствует"})
            }
            const user = await User.findOne({_id: inserter})

            console.log('update branch runned', user)

            const isAdminOrModerator = hasAccess(user)

            if (!isAdminOrModerator) {
                if (filial.inserter !== data.inserter) {
                    return res.status(403).json({message: "Пользователь не является создателем филиала"})
                }
                return res.status(403).json({message: "У пользователя не доступа для редактирование данного филиала"})
            }
            if (data.is_blocked === true && !user.roles.includes('ADMIN')) {
                return res.status(403).json({message: "Вы не являетесь администратором"})
            }

            const post = await PostService.update(filial._id, data, image)
            return res.json(post)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Insert error'})
        }
    }

    async deleteBranch(req, res) {
        try {
            const data = req.body
            const name = data.name
            const inserter = data.inserter

            const filial = await Branch.findOne({name})
            if (!filial) {
                return res.status(400).json({message: "Филиал отсутствует"})
            }
            const user = await User.findOne({_id: inserter})

            const isAdminOrModerator = hasAccess(user)

            if (!isAdminOrModerator) {
                if (filial.inserter !== data.inserter) {
                    return res.status(403).json({message: "Пользователь не является создателем филиала"})
                }
                return res.status(403).json({message: "У пользователя не доступа для редактирование данного филиала"})
            }
            await PostService.delete(filial)
            return res.json('Филиал успешно удален')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Insert error'})
        }
    }

    async getBranch(req, res) {
        try {
            const inserter = req.body.inserter

            const user = await User.findOne({_id: inserter})

            const isAdminOrModerator = hasAccess(user)

            if (!isAdminOrModerator) {
                const branches = await Branch.find({inserter: inserter})
                if (branches.length === 0) {
                    return res.status(400).json({message: "Филиалы отсутствуют"})
                }
                return res.json(branches)
            }

            return res.json(await Branch.find({}))
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Insert error'})
        }
    }

}

module.exports = new branchController()