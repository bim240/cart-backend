var Cart = require("../../models/cart");

module.exports = {
  getCart: async (req, res, next) => {
    try {
      let cartInfo = await Cart.findOne({ userId: req.user.userId }).populate(
        "product"
      );
      res.status(200).json({ cart: cartInfo });
    } catch (error) {
      next(error);
    }
  },
  addToCart: async (req, res, next) => {
    try {
      let cart = await Cart.findOne({ userId: req.user.userId });
      let updatedCart = await Cart.findByIdAndUpdate(
        cart.id,
        { $push: { product: req.body.product.id } },
        { new: true }
      ).populate("product");
      res.status(200).json({ cart: updatedCart });
    } catch (error) {
      next(error);
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      let cart = await Cart.findOne({ userId: req.user.userId });
      let updatedCart = await Cart.findByIdAndUpdate(
        cart.id,
        { $pull: { product: req.body.product.id } },
        { new: true }
      ).populate("product");
      res.status(200).json({ msg: "product removed" });
    } catch (error) {
      next(error);
    }
  },
};
