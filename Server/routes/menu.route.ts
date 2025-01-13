import express from "express" 
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controller/menu.controller";

const router = express.Router();

router.route("/").post(upload.single("image"), addMenu);
router.route("/:id").put(upload.single("image"), editMenu);
 
export default router;