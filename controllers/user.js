const User = require("../models/user")


// middleware functions

// verify user
// login function returns user info object
module.exports.login = async (req, res, next) => {
    try {
        const { Username, Password } = req.body
        const user = await User.findOne({ Username })
        if (!user) res.json({ msg: 'Invalid Username!!', status: false })
        if (Password !== user.Password)
            res.json({
                msg: 'Incorrect Password!!',
                status: false
            })

        res.status(200).json({ status: true, user})
    } catch (err) {
        next(err)
    }
}

module.exports.userInfo = async (req, res, next) => {
    try {
        // get user Username from req.user (see middleware/authen.js)
        const { Username } = req.body
        if (!Username) res.json({
            msg: "Can not get user Username!",
            status: false
        })
        const user = await User.findOne({ Username })
        if (!user)
            res.json({
                msg: 'Invalid Username!!',
                status: false
            })

        const { Name, Birthday, Gender, Address, Phone, Email } = user
        res.status(200).json({
            data: {
                Name,
                Birthday,
                Gender,
                Address,
                Phone,
                Email
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports.modifyInfo = async (req, res, next) => {
    try {
        // get user Username from req.user
        const { Username } = req.user
        if (!Username) res.json({ msg: "Can not get user's Username!" })

        const { Name, Birthday, Gender, Address, Phone, Email } = req.body

        if (!Username) res.json({
            msg: "Can not get user's Username!",
            status: false
        })

        // { filter }, { update }, { set new to 'true' to update }
        const user = await User.findOneAndUpdate(
            { Username },
            { Name, Birthday, Gender, Address, Phone, Email },
            { new: true }
        )

        if (!user) res.json({
            msg: 'Invalid Username!',
            status: false
        })

        res.status(200).json({ user, status: true })

    } catch (err) {
        next(err)
    }
}