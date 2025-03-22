import { Category, Product } from "#models";

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .end();
  };

  await Category.create(req.body);

  return res
    .status(201)
    .end();
};

async function update(req, res) {
  await Category.updateOne({ _id: req.params.id }, req.body);

  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  const products = await Product.find({ category: req.params.id });

  if (products) {
    return res
      .status(400)
      .end();
  };

  await Category.deleteOne({ _id: req.params.id });

  return res
    .status(200)
    .end();
};

export { create, update, remove };
