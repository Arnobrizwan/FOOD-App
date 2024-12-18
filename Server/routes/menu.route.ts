import express from "express" 
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controller/menu.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("image"), editMenu);
 

// router.route("/").post( upload.single("image"), asyncHandler(addMenu));
// router.route("/:id").put(isAuthenticated, upload.single("image"), asyncHandler(editMenu));



export default router;

