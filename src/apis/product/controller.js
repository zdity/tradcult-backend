import { Product } from "#models";

async function add(req, res) {
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

async function edit(req, res) {
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

export { add, edit, remove };
