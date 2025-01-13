import express from "express"
import {isAuthenticated} from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrders, getOrdersForDeliveryMan, stripeWebhook } from "../controller/order.controller";
const router = express.Router();

router.route("/").get(getOrders);
router.route("/checkout/create-checkout-session").post(createCheckoutSession);
router.route("/webhook").post(express.raw({type: 'application/json'}), stripeWebhook);
router.route("/getOrdersForDeliveryMan").get(getOrdersForDeliveryMan);

export default router;