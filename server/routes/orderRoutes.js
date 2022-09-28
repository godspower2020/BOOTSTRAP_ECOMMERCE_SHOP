import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../middleware/AuthMiddleware.js";
import Order from "./../models/OrderModel.js";

const orderRoute = express.Router()

// LOGIN ROUTE
orderRoute.post(
    "/",
    protect, 
    asyncHandler(async(req, res) => {
    const {
        orderItems, 
        ShippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
        return
    } else {
        const order = new Order({
            orderItems, 
            ShippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createOrder = await order.save()
        res.status(201).json(createOrder);
    } 
}))

export default orderRoute;