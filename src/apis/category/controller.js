import { Category, Product } from "#models";

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .end();
  };

  await Category.create({
    name
  });

  return res
    .status(201)
    .end();
};

async function update(req, res) {
  const { name } = req.body;

  const { matchedCount } = await Category.updateOne({ _id: req.params.id }, {
    name
  });

  if (matchedCount == 0) {
    return res
      .status(400)
      .end();
  };

  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  const products = await Product.find({ category: req.params.id });

  if (products.length == 0) {
    return res
      .status(400)
      .end();
  };

  const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

  if (deletedCount == 0) {
    return res
      .status(400)
      .end();
  };

  return res
    .status(200)
    .end();
};

export { create, update, remove };
