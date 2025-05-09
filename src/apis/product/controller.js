import { Category, Product } from "#models";

async function create(req, res) {
  const { name, description, price, category } = req.body;

  if (!name || (typeof price != "number" || price < 0) || !category) {
    return res.status(400).end();
  };

  try {
    if (!(await Category.exists({ _id: category }))) {
      return res.status(400).end();
    };

    await Product.create({
      name,
      description,
      price,
      category
    });
  } catch {
    return res.status(500).end();
  };

  return res.status(201).end();
};

async function update(req, res) {
  const { name, description, price, category } = req.body;

  if (price !== undefined) {
    if (typeof price != "number" || price < 0) {
      return res.status(400).end();
    };
  };

  try {
    if (category && !(await Category.exists({ _id: category }))) {
      return res.status(400).end();
    };

    const { matchedCount } = await Product.updateOne({ _id: req.params.id }, {
      name,
      description,
      price,
      category
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
    const { deletedCount } = await Product.deleteOne({ _id: req.params.id });

    if (deletedCount == 0) {
      return res.status(400).end();
    };
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

export { create, update, remove };
