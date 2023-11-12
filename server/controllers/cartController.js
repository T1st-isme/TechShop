import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler";

const runUpdate = asyncHandler(async (condition, update) => {
  try {
    const result = await Cart.findOneAndUpdate(condition, update, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const addItemToCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    let promiseArray = [];

    req.body.cartItems.forEach((cartItem) => {
      const product = cartItem.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;
      if (item) {
        condition = {
          user: req.user._id,
          cartItems: { $elemMatch: { product } },
        };
        update = {
          $inc: { "cartItems.$.quantity": cartItem.quantity },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: cartItem,
          },
        };
      }
      promiseArray.push(runUpdate(condition, update));
    });

    Promise.all(promiseArray)
      .then((response) => res.status(201).json({ response }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    const cart = new Cart({
      user: req.user._id,
      cartItems: req.body.cartItems,
    });

    const newCart = await cart.save();
    return res.status(201).json({
      success: newCart ? true : false,
      cart: newCart,
    });
  }
});

// exports.addToCart = (req, res) => {
//     const { cartItems } = req.body;
//     if(cartItems){
//        if(Object.keys(cartItems).length > 0){
//            Cart.findOneAndUpdate({
//                "user": req.user._id
//            }, {
//                "cartItems": cartItems
//            }, {
//                 upsert: true, new: true, setDefaultsOnInsert: true
//            }, (error, cartItems) => {
//                if(error) return res.status(400).json({ error });
//                if(cartItems) res.status(201).json({ message: 'Added Successfully' });
//            })
//        }
//        //res.status(201).json({ cartItems });
//     }else{
//         //res.status(201).json({ req });
//     }
// }

export const getCartItems = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price proImg")
    .exec();

  if (!cart)
    return res.status(404).json({ error: "Giỏ hàng không tồn tại!!!" });

  const cartItems = cart.cartItems.reduce((items, item) => {
    if (item.product) {
      items[item.product._id.toString()] = {
        _id: item.product._id.toString(),
        name: item.product.name,
        img: item.product.proImg[0]?.img || "",
        price: item.product.price,
        quantity: item.quantity,
      };
    }
    return items;
  }, {});

  res.status(200).json({
    success: cartItems ? true : false,
    cartItems,
  });
});

// New removeCartItems function
export const removeCartItems = asyncHandler(async (req, res) => {
  const { productId } = req.body.payload;
  if (!productId)
    return res
      .status(400)
      .json({ error: "Không tìm thấy sản phẩm trong giỏ hàng!!!" });

  const result = await Cart.updateOne(
    { user: req.user._id },
    { $pull: { cartItems: { product: productId } } }
  ).exec();

  if (result) {
    res.status(202).json({ result });
  } else {
    res.status(400).json({ error: "Failed to remove cart items" });
  }
});
