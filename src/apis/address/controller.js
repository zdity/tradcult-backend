import { User } from "#models";

async function add(req, res) {
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;

  const { name, phone, address, pincode, setDefault } = req.body;

  if (!name || !phone || !address || !pincode) {
    return res.status(400).end();
  } else if (!phoneRegex.test(phone) || !pincodeRegex.test(pincode)) {
    return res.status(400).end();
  }

  try {
    if (setDefault) {
      const user = await User.findOne({ _id: req.user._id });
      const index = user.addresses.findIndex(address => address.default);

      if (index != -1) {
	user.addresses[index].default = undefined;
      }

      await user.save();
    }

    await User.updateOne({ _id: req.user._id }, {
      $push: {
        addresses: {
          name,
          phone,
	  address,
	  pincode,
	  default: setDefault ? true : undefined
        }
      }
    });

    return res.status(200).end();
  } catch {
    return res.status(500).end();
  };
};

async function update(req, res) {
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;

  const { name, phone, address, pincode, setDefault } = req.body;

  if (phone !== undefined && !phoneRegex.test(phone)) {
    return res.status(400).end();
  } else if (pincode !== undefined && !pincodeRegex.test(pincode)) {
    return res.status(400).end();
  }

  try {
    const user = await User.findOne({ _id: req.user._id });

    if (setDefault) {
      const index = user.addresses.findIndex(address => address.default);

      if (index != -1) {
	user.addresses[index].default = undefined;
      }
    }

    const index = user.addresses.findIndex(address => address._id == req.params.id);

    if (index == -1) {
      return res.status(400).end();
    }

    const updates = [ name, phone, address, pincode ];

    updates.forEach(update => {
      if (update) user.addresses[index][update] = update;
    });

    if (setDefault) user.addresses[index].default = setDefault ? true : undefined;

    await user.save();

    return res.status(200).end();
  } catch {
    return res.status(500).end();
  };
};

async function remove(req, res) {
  try {
    const { modifiedCount } = await User.updateOne(
      { _id: req.user._id },
      { $pull: { addresses: { _id: req.params.id } } }
    );

    if (modifiedCount == 0) {
      return res.status(400).end();
    }

    return res.status(200).end();
  } catch {
    return res.status(500).end();
  };
};

export { add, update, remove };
