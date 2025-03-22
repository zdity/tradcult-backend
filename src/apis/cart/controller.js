import { Product, User } from "#models";

async function add(req, res) {
  const { product } = req.body;

  if (!product || !await Product.exists({ _id: product })) {
    return res
      .status(400)
      .end();
  };

  await User.updateOne(
    { _id: req.user._id },
    { $push: { cart: req.body } }
  );

  return res
    .status(200)
    .end();
};

async function update(req, res) {
  const user = await User.findOne({ _id: req.user._id });
  const index = user.cart.findIndex(item => item._id == req.params.id);

  if (index == -1) {
    return res
      .status(400)
      .end();
  };

  Object.assign(user.cart[index], req.body);
  await user.save();

  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  const user = await User.findOne({ _id: req.user._id });
  const index = user.cart.findIndex(item => item._id == req.params.id);

  if (index == -1) {
    return res
      .status(400)
      .end();
  };

  await User.updateOne(
    { _id: req.user._id },
    { $pull: { cart: { _id: req.params.id } } }
  );

  return res
    .status(200)
    .end();
};

export { add, update, remove };
