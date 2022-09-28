const User = require("../models/user-model")
const bcrypt = require("bcrypt")

createUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a user data",
        })
    }

    const salt = await bcrypt.genSalt()
    body.password = await bcrypt.hash(body.password, salt)

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    } 

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: "User created!",
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "User not created!",
            })
        })
}

getUserByEmail = async (req, res) => {
    await User.findOne({ email: req.params.email}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: "User not found" });
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: "Users not found" });
        }

        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a body to update",
        })
    }

    User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "User not found!",
            })
        }

        user.name = body.name
        user.email = body.email
        user.password = body.password

        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    email: user.email,
                    message: "User updated!",
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: "User not updated",
                })
            })
    })
}

verifyUserLogin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email}).lean()

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        console.log(user.password)
        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).json({
                success: true,
                data: user
            })
        }

        return res.status(422).json({
            success: false,
            message: "Invalid password"
        })
    } catch (error) {
        return  res.status(400).json({
            success: false,
            error: error,
        })
    }
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params._id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found"})
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUserByEmail,
    getUsers,
    deleteUser,
    updateUser,
    verifyUserLogin,
}