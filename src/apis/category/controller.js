import { Category, Product } from "#models";

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  };

  try {
    await Category.create({
      name
    });
  } catch {
    return res.status(500).end();
  };

  return res.status(201).end();
};

async function update(req, res) {
  const { name } = req.body;

  if (name !== undefined && typeof name != "string") {
    return res.status(400).end();
  };

  try {
    const { matchedCount } = await Category.updateOne({ _id: req.params.id }, {
      name
    });

    if (matchedCount == 0) {
      return res.status(400).end();
    };
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

async function remove(req, res) {
  try {
    if (await Product.exists({ category: req.params.id })) {
      return res.status(400).end();
    };

    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

    if (deletedCount == 0) {
      return res
        .status(400)
        .end();
    };
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

export { create, update, remove };
