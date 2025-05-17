const CategoryModel = require("../model/categoryModel");
const ColorModel = require("../model/colorModel");

const colorController = {
    async create(req, res) {
        try {
            const { name, slug, hexcode } = req.body;
            if (!name || !slug || !hexcode) {
                return res.send({ msg: "All field are required", flag: 0 });
            }

            const color = await ColorModel({
                name,
                slug,
                hexcode
            })
            color.save().then(
                () => {
                    return res.send({ msg: "Color added", flag: 1 });
                }
            ).catch(
                () => {
                    return res.send({ msg: "Unable to create color", flag: 0 });

                }
            )



        } catch (err) {
            res.send({ msg: "Internal server error", flag: 0 })
        }


    },
    async getdata(req, res) {
        try {
            const id = req.params.id;
            let colors = null;
            if (id) {
                colors = await ColorModel.findById(id)

            } else {
                colors = await ColorModel.find();
            }

            if (!colors) {
                return res.send({ msg: "No colors found", flag: 0 });
            }
            res.send({ msg: "Colors fetched successfully", flag: 1, colors })


        } catch (err) {
            res.send({ msg: "Internal server error", flag: 0 })
        }


    },
}

module.exports = colorController;