import { Category, Product } from "#models";

async function create(req, res) {
  const { name, description, price, category, stock } = req.body;

  if (!name || price === undefined || !category || stock === undefined) {
    return res.status(400).end();
  } else if (!isPriceValid(price) || !isStockValid(stock)) {
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
      category,
      stock
    });
  } catch {
    return res.status(500).end();
  };

  return res.status(201).end();
};

async function update(req, res) {
  const { name, description, price, category, stock } = req.body;

  if (price !== undefined && !isPriceValid(price)) {
      return res.status(400).end();
  } else if (stock !== undefined && !isStockValid(stock)) {
      return res.status(400).end();
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

function isPriceValid(price) {
  return Number.isFinite(price) && price > 0;
};

function isStockValid(stock) {
  return Number.isInteger(stock) && stock > 0;
};

export { create, update, remove };
