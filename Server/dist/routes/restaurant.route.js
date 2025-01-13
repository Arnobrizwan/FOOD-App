"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_controller_1 = require("../controller/restaurant.controller");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.default.Router();
router.route("/").post(multer_1.default.single("imageFile"), restaurant_controller_1.createRestaurant);
router.route("/").get(restaurant_controller_1.getRestaurant);
router.route("/").put(multer_1.default.single("imageFile"), restaurant_controller_1.updateRestaurant);
router.route("/order").get(restaurant_controller_1.getRestaurantOrder);
router.route("/order/:orderId/status").put(restaurant_controller_1.updateOrderStatus);
router.route("/search/:searchText").get(restaurant_controller_1.searchRestaurant);
router.route("/:id").get(restaurant_controller_1.getSingleRestaurant);
exports.default = router;
