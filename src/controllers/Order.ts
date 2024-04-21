import {
  ActionResponse,
  CreateOrderPayload,
  GetListResponse,
  GetOneResponse,
} from "../types";
import { IOrder, Order } from "../entities/Order";
import { decodeBearerToken } from "../utils";
import express from "express";
import { Cart, ICart } from "../entities/Cart";
import { IProduct, Product } from "../entities/Product";

//create order (check out functions)
const createOrder = async (req: CreateOrderPayload, res: ActionResponse) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const userInfo = await decodeBearerToken(authorizationHeader);

    const { cartId, address } = req.body;
    const newOrder = new Order({
      userId: userInfo?.userId,
      items: [],
      status: "new",
      totalPrice: 0,
    });

    //SAVE ORDER
    for (const cartItemData of cartId) {
      const cartItem: ICart = await Cart.findById(cartItemData);

      if (cartItem) {
        newOrder.items.push(cartItem._id);
        newOrder.totalPrice += cartItem?.price;
      }
    }
    try {
      await newOrder.save();
    } catch (error) {
      console.log("SAVE ORDER ERROR", error);
    }
    for (const cartItemId of cartId) {
      // await updateProductQuantity(req, res);
      await Cart.findByIdAndRemove(cartItemId);
    }
    return res
      .status(200)
      .json({ success: true, message: "Tạo order thành công", code: 200 });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server gặp lỗi khi cố tạo đơn hàng",
      code: 500,
    });
  }
};

//create order (check out functions)
const cancelOrder = async (req: CreateOrderPayload, res: ActionResponse) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const userInfo = await decodeBearerToken(authorizationHeader);
    const { orderId } = req.params;

    const findedOrder = await Order.findOne({ _id: orderId });

    if (!!findedOrder) {
      await findedOrder.update({
        $set: {
          status: "canceled",
        },
      });
      return res
        .status(200)
        .json({ success: true, message: "Hủy đơn hàng thành công", code: 200 });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order is not existed", code: 404 });
    }
  } catch {}
};

const getOrderByUser = async (
  req: express.Request,
  res: GetListResponse<IOrder>
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const userInfo = await decodeBearerToken(authorizationHeader);
    const findedOrder = await Order.find({
      userId: userInfo?.userId as string,
    }).populate({
      path: "userId",
      select: "phoneNumber name address",
    });

    const totalRecords = await Order.countDocuments();
    return res?.status(200).json({
      code: 200,
      results: findedOrder,
      totalRecords: totalRecords,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      results: [],
      totalRecords: 0,
      code: 500,
    });
  }
};

const getOrderDetail = async (
  req: express.Request,
  res: GetOneResponse<IOrder>
) => {
  try {
    const { orderId } = req.params;
    const findedOrder = await Order.findOne({
      _id: orderId,
    }).populate({
      path: "userId", // Đảm bảo đây là tên trường trong Cart schema bạn muốn populate
      select: "phoneNumber name address", // Chỉ select trường price từ Product
    });
    if (findedOrder) {
      return res
        ?.status(200)
        .json({ code: 200, results: findedOrder, success: true });
    }
  } catch (error) {
    return res?.status(500)?.json({ code: 500, results: null, success: false });
  }
};

// const updateProductQuantity = async (
//   req: express.Request,
//   res: express.Response,
//   cart: ICart
// ) => {
//   const currentCart = (await Cart.findOne({ id: cart?._id })).populate({
//     path: "productId", // Đảm bảo đây là tên trường trong Cart schema bạn muốn populate
//     select: "", // Chỉ select trường price từ Product
//   });
//   try {
//     await Product.updateOne(
//       { _id: cart.id, "sizes.size": currentCart?.size },
//       { $inc: { "sizes.$.quantity": -cart?.quantity } } // Decrement quantity
//     );
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server gặp vấn đề khi cố update lại số lượng size trong kho",
//       code: 500,
//     });
//   }
// };

export { createOrder, getOrderByUser, getOrderDetail, cancelOrder };
