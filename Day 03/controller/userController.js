const UserModel = require('../model/UserModel')

const UserController = {
    create(req, res) {
        try {
            console.log(req.body)
            if (!req.body.name || !req.body.email) {
                return res.send(
                    {
                        msg: "All field is required",
                        flag: 0
                    }
                )

            }
            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact
            })

            user.save().then(
                () => {
                    res.json({
                        msg: "User created successfully",
                        flag: 1
                    })

                }
            ).catch(
                () => {
                    res.send({
                        msg: "Error creating user",
                        flag: 0
                    })

                }
            )

        } catch (error) {
            res.send(
                {
                    msg: "Internal server error",
                    flag: 0
                }
            )

        }

    },
    async getdata(req, res) {
        try {
            const user = await UserModel.find()
            res.send({
                msg: "User data fetched successfully",
                flag: 1,
                users: user,
                total: user.length

            })

        } catch (error) {
            res.send(
                {
                    msg: "Internal server error",
                    flag: 0
                }
            )
        }

    },
    async update(req, res) {
        try {
            const id = req.params.id;
            UserModel.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    ...req.body
                }
            ).then(
                () => {
                    res.send(
                        {
                            msg: "User details update",
                            flag: 1
                        }
                    )

                }

            ).catch(
                () => {
                    res.send(
                        {
                            msg: "Unable to update user",
                            flag: 0
                        }
                    )

                }
            )

        } catch (error) {
            res.send(
                {
                    msg: "Internal server error",
                    flag: 0
                }
            )
        }

    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (user) {

                await UserModel.deleteOne({
                    _id: id
                })

                res.send(
                    {
                        msg: "User delete",
                        flag: 1
                    }
                )
            } else {
                res.send(
                    {
                        msg: "User not find",
                        flag: 0
                    }
                )

            }




        } catch (error) {
            res.status(500).send(
                {
                    msg: "Internal server error",
                    flag: 0
                }
            )
        }

    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (user) {

                await UserModel.updateOne(
                    {
                        _id: id
                    },
                    {
                        $set: {
                            status: !user.status

                        }
                    }
                ).then(
                    () => {
                        res.send(
                            {
                                msg: "User status update",
                                flag: 1
                            }
                        )

                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                msg: "Unable to update user status",
                                flag: 0
                            }
                        )

                    }
                )

            } else {
                res.send({
                    msg: "User not found",
                    flag: 0
                })
            }

        } catch (error) {
            res.send(
                {
                    msg: "Internal server error",
                    flag: 0
                }
            )

        }

    }
}

module.exports = UserController;