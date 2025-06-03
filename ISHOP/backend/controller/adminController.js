const { generateToken } = require("../helper");
const AdminModel = require("../model/adminModel")

const adminController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(password)
            if (!email || !password) {
                return res.send({ msg: "All field are required", flag: 0 });
            }
            const admin = await AdminModel.findOne({ email: email });
            if (admin) {
                if (admin.password === password) {
                    res.send({
                        msg: "Login Succesfully",
                        flag: 1,
                        admin: { ...admin.toJSON(), password: null },
                        token: generateToken({ ...admin.toJSON() })

                    })
                } else {
                    res.send({ msg: "password do'es not match", flag: 0 })
                }
            }

        } catch (err) {
            console.log(err)
            res.send({ msg: "Internal server error", flag: 0 })
        }


    },

}

module.exports = adminController;