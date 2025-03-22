import { Product } from "#models";

async function create(req, res) {
  const { name, description, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res
      .status(400)
      .end();
  };

  await Product.create({
    name,
    description,
    price,
    category: categoryId
  });

  return res
    .status(200)
    .end();
};

async function update(req, res) {
  const id = req.params.id;

  const { name, description, price, categoryId } = req.body;

  if (!id) {
    return res
      .status(400)
      .end();
  };

  if (!name || !price || !categoryId) {
    return res
      .status(400)
      .end();
  };

  await Product.updateOne({ _id: id }, {
    name,
    description,
    price,
    category: categoryId
  });

  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .end();
  };

  await Product.deleteOne({ _id: id });

  return res
    .status(200)
    .end();
};

export { create, update, remove };
