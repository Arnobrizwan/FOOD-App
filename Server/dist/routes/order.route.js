"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const router = express_1.default.Router();
router.route("/").get(order_controller_1.getOrders);
router.route("/checkout/create-checkout-session").post(order_controller_1.createCheckoutSession);
router.route("/webhook").post(express_1.default.raw({ type: 'application/json' }), order_controller_1.stripeWebhook);
router.route("/getOrdersForDeliveryMan").get(order_controller_1.getOrdersForDeliveryMan);
exports.default = router;
