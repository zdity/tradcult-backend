import { Category, Product } from "#models";

async function create(req, res) {
  const { name, description, price, category } = req.body;

  if (!name || !price || !category || !await Category.exists({ _id: category })) {
    return res
      .status(400)
      .end();
  };

  await Product.create({
    name,
    description,
    price,
    category
  });

  return res
    .status(201)
    .end();
};

async function update(req, res) {
  const { name, description, price, category } = req.body;

  if (category && !await Category.exists({ _id: category })) {
    return res
      .status(400)
      .end();
  };

  const { matchedCount } = await Product.updateOne({ _id: req.params.id }, {
    name,
    description,
    price,
    category
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
  const { deletedCount } = await Product.deleteOne({ _id: req.params.id });

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
