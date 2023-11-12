const pick = require('lodash/pick')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userCltr = {}
userCltr.login = async (req, res) => {
    const body = pick(req.body, ['customerName', 'username', 'password', 'preferredCategory'])
    try {
        const userDoc = await User.findOne({ username: body.username })
        //if username already exists
        if (userDoc) {
            res.status(400).json({ message: 'username already exists' })

        } else {
            //if username doesn't exist 
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const user = new User({ ...body, password: hashedPassword })
            const userRecord = await user.save()
            const token = jwt.sign({ username: body.username }, 'backend')
            res.status(200).json({ message: 'credentials inserted successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })

    }

}
module.exports = userCltr