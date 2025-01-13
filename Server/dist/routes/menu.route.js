"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const menu_controller_1 = require("../controller/menu.controller");
const router = express_1.default.Router();
router.route("/").post(multer_1.default.single("image"), menu_controller_1.addMenu);
router.route("/:id").put(multer_1.default.single("image"), menu_controller_1.editMenu);
exports.default = router;
