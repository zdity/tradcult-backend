import { User, Order } from "#models";

async function create(req, res) {
  const { addressId, paymentMethod } = req.body;
  let paymentStatus = "unpaid";
  // todo: address and payment

  try {
    const user = await User.findOne({ _id: req.user._id }).populate("cart.product");

    const items = user.cart.map(item => {
      return {
	product: item.product._id,
	snapshot: item.product,
	quantity: item.quantity
      }
    });

    const total = user.cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    });

    const addressIndex = user.addresses.findIndex(address => address._id == addressId);

    if (addressIndex == -1) {
      return res.status(400).end();
    };

    const address = user.addresses[addressIndex];

    if (!["online", "offline"].includes(paymentMethod)) {
      return res.status(400).end();
    }

    if (paymentMethod == "online") {
      // payment

      paymentStatus = "paid";
    }

    await Order.create({
      user: req.user._id,
      items,
      total,
      address,
      payment: {
	method: paymentMethod,
	status: paymentStatus
      }
    });

    user.cart = [];

    await user.save();

    return res.status(201).end();
  } catch {
    return res.status(500).end();
  }
}

async function cancel(req, res) {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(400).end();
    }

    if (order.user != req.user._id) {
      return res.status(403).end();
    }

    if (!["pending", "updated"].includes(order.status)) {
      return res.status(400).end();
    }

    if (order.payment.status == "paid") {
      // refund

      order.payment.status = "refunded";
    }

    order.status = "canceled";

    await order.save();

    return res.status(200).end();
  } catch {
    return res.status(500).end();
  }
}

export { create, cancel };
