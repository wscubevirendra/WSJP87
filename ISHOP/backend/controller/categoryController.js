const { createUniqueImageName } = require("../helper");
const CategoryModel = require("../model/categoryModel");
const ProductModel = require("../model/productModel");
const { unlinkSync } = require("fs")

const categoryController = {
    async create(req, res) {
        try {
            const image = req.files.image
            const { name, slug } = req.body;
            if (!name || !slug || !image) {
                return res.send({ msg: "All field are required", flag: 0 });

            }
            const categoryImage = createUniqueImageName(image.name)
            const destination = "./public/images/category/" + categoryImage

            image.mv(
                destination,
                async (error) => {
                    if (error) {
                        return res.send({ msg: "Unbale to upload category image", flag: 0 })
                    } else {
                        const category = new CategoryModel({
                            name: name,
                            slug: slug,
                            image: categoryImage
                        })

                        await category.save().then(() => {
                            res.send({ msg: "Category created successfully", flag: 1 })
                        }).catch((err) => {
                            return res.send({ msg: "Unable to create category", flag: 0 })
                        })

                    }

                }
            )





        } catch (err) {
            console.log(err)
            res.send({ msg: "Internal server error", flag: 0 })
        }


    },

    async getdata(req, res) {
        try {
            const id = req.params.id;
            let categories = null;
            if (id) {
                categories = await CategoryModel.findById(id)
                res.send({ msg: "Categories fetched successfully", flag: 1, categories })

            } else {

                categories = await CategoryModel.find();
                const allcategory = [];
                const allPromise = categories.map(
                    async (Category) => {
                        const productCount = await ProductModel.findOne({ categoryId: Category._id }).countDocuments();

                        allcategory.push({
                            ...Category.toJSON(),
                            productCount: productCount
                        });




                    }


                )
                await Promise.all(allPromise)
                res.send({ msg: "Categories fetched successfully", flag: 1, categories: allcategory })
            }

            if (!categories) {
                return res.send({ msg: "No categories found", flag: 0 });
            }



        } catch (err) {
            res.send({ msg: "Internal server error", flag: 0 })
        }


    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.send({ msg: "No categories found", flag: 0 });
            }
            await CategoryModel.updateOne(
                { _id: id },
                { status: !category.status }
            ).then(
                () => {
                    return res.send({ msg: "Category update", flag: 1 });
                }
            ).catch(
                () => {
                    return res.send({ msg: "Unable to  update category", flag: 0 });

                }
            )

        } catch (error) {
            console.log(error)
            res.send({ msg: "Internal server error", flag: 0 })
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const category = await CategoryModel.findById(id);
            await CategoryModel.deleteOne(
                {
                    _id: category._id
                }
            ).then(
                () => {
                    unlinkSync("./public/images/category/" + category.image)

                    res.send({ msg: "Category delete", flag: 1 })

                }
            ).catch(
                () => {
                    res.send({ msg: "Unable to delete category", flag: 0 })

                }
            )

        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0 })
        }
    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const image = req.files.image ? req.files.image : null;

            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.send({ msg: "No categories found", flag: 0 });
            }

            if (image) {
                const categoryImage = createUniqueImageName(image.name);
                const destination = "./public/images/category/" + categoryImage;

                image.mv(destination, async (err) => {
                    if (err) {
                        return res.send({ msg: "Unable to update category image", flag: 0 });
                    } else {
                        try {
                            await CategoryModel.updateOne(
                                { _id: id },
                                {
                                    name: req.body.name,
                                    slug: req.body.slug,
                                    image: categoryImage
                                }
                            );
                            unlinkSync("./public/images/category/" + category.image)
                            res.send({ msg: "Category updated successfully", flag: 1 });
                        } catch (err) {
                            return res.send({ msg: "Unable to update category", flag: 0 });
                        }
                    }
                });
            } else {
                // Only update name and slug
                await CategoryModel.updateOne(
                    { _id: id },
                    {
                        name: req.body.name,
                        slug: req.body.slug
                    }
                );
                res.send({ msg: "Category updated successfully", flag: 1 });
            }
        } catch (error) {
            console.log(error);
            res.send({ msg: "Internal server error", flag: 0 });
        }
    }


}

module.exports = categoryController;