import { Category } from "#models";

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
    .status(200)
    .end();
};

async function update(req, res) {
  const id = req.params.id;

  const { name } = req.body;

  if (!id) {
    return res
      .status(400)
      .end();
  };

  if (!name) {
    return res
      .status(400)
      .end();
  };

  await Category.updateOne({ _id: id }, {
    name
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

  const hasProducts = await Product.findOne({ category: id });

  if (hasProducts) {
    return res
      .status(400)
      .end();
  };

  await Category.deleteOne({ _id: id });

  return res
    .status(200)
    .end();
};

export { create, update, remove };
