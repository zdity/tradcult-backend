import { Product, User } from "#models";

async function add(req, res) {
  const { product, quantity } = req.body;

  if (!product) {
    return res.status(400).end();
  };

  if (quantity !== undefined && !isQuantityValid(quantity)) {
    return res.status(400).end();
  };

  try {
    if (!(await Product.exists({ _id: product }))) {
      return res.status(400).end();
    };

    await User.updateOne({ _id: req.user._id }, {
      $push: {
        cart: {
          product,
          quantity
        }
      }
    });
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

async function update(req, res) {
  const { quantity } = req.body;

  if (quantity !== undefined && !isQuantityValid(quantity)) {
    return res.status(400).end();
  };

  try {
    const user = await User.findOne({ _id: req.user._id });
    const index = user.cart.findIndex(item => item._id == req.params.id);

    if (index == -1) {
      return res.status(400).end();
    };

    const updates = [ quantity ];

    updates.forEach(update => {
      if (update) user.cart[index][update] = update;
    });

    await user.save();
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

async function remove(req, res) {
  try {
    const { modifiedCount } = await User.updateOne(
      { _id: req.user._id },
      { $pull: { cart: { _id: req.params.id } } }
    );

    if (modifiedCount == 0) {
      return res.status(400).end();
    };
  } catch {
    return res.status(500).end();
  };

  return res.status(200).end();
};

function isQuantityValid(quantity) {
  return typeof quantity == "number" && quantity % 1 == 0  && quantity > 0;
};

export { add, update, remove };
