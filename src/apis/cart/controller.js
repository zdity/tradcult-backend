import { Product, User } from "#models";

async function add(req, res) {
  const userId = req.user._id;

  const { productId, quantity } = req.body;

  if (!productId || !await Product.exists({ _id: productId })) {
    return res
      .status(400)
      .end();
  };

  const user = await User.findOne({ _id: userId });

  user.cart.push({
    id: user.cart.length,
    product: productId,
    quantity
  });

  await user.save();
  
  return res
    .status(200)
    .end();
};

async function edit(req, res) {
  const userId = req.user._id;
  const itemIndex = req.params.index;

  const { quantity } = req.body;

  const user = await User.findOne({ _id: userId });
  const item = user.cart.find((item, index) => {
    if (index == itemIndex) {
      return item;
    };

    return null;
  });

  if (!item) {
    return res
      .status(400)
      .end();
  };

  if (!quantity) {
    return res
      .status(400)
      .end();
  };

  Object.assign(user.cart[itemIndex], {
    quantity
  });

  await user.save();
  
  return res
    .status(200)
    .end();
};

async function remove(req, res) {
  const userId = req.user._id;
  const itemIndex = req.params.index;

  const user = await User.findOne({ _id: userId });
  const item = user.cart.find((item, index) => {
    if (index == itemIndex) {
      return item;
    };

    return null;
  });

  if (!item) {
    return res
      .status(400)
      .end();
  };

  user.cart = user.cart.filter((_, index) => index != itemIndex);

  await user.save();
  
  return res
    .status(200)
    .end();
};

export { add, edit, remove };
