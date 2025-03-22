import { Product } from "#models";

async function create(req, res) {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .end();
  };

  await Product.create(req.body);

  return res
    .status(201)
    .end();
};

async function update(req, res) {
  await Product.updateOne({ _id: req.params.id }, req.body);

  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  await Product.deleteOne({ _id: req.params.id });

  return res
    .status(200)
    .end();
};

export { create, update, remove };
