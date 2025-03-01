import express from "express"
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/").post(upload.single("imageFile"), createRestaurant);
router.route("/").get(getRestaurant);
router.route("/").put(upload.single("imageFile"), updateRestaurant);
router.route("/order").get( getRestaurantOrder);
router.route("/order/:orderId/status").put(updateOrderStatus);
router.route("/search/:searchText").get(searchRestaurant);
router.route("/:id").get(getSingleRestaurant);

export default router;