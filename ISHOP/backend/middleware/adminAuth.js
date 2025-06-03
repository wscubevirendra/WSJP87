const { verifyToken } = require("../helper");

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        if (token) {
            if (verifyToken(token)) {
                next()
            } else {
                res.send(
                    {
                        msg: "Invalid token ",
                        flag: 0
                    }
                )
            }

        } else {
            res.send(
                {
                    msg: "token required",
                    flag: 0
                }
            )
        }

    } catch (error) {
        res.send(
            {
                msg: "internal Server error",
                flag: 0
            }
        )
    }

}

module.exports = adminAuth