import { Request, Response, NextFunction } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant, IRestaurantDocument } from "../models/restaurant.model";
import mongoose from "mongoose";
import uploadImageOnCloudinary from "../utils/imageUpload";

export const addMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, description, price } = req.body;
      const file = req.file;
  
      if (!file) {
        res.status(400).json({
          success: false,
          message: "Image is required",
        });
        return;
      }
  
      const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
      const menu = await Menu.create({
        name,
        description,
        price,
        image: imageUrl,
      });
  
      // Explicitly cast the result to IRestaurantDocument
      const restaurant = (await Restaurant.findOne({ user: req.id })) as IRestaurantDocument | null;
  
      if (restaurant) {
        // Push the menu._id to the menus array
        restaurant.menus.push(menu._id as mongoose.Schema.Types.ObjectId);
        await restaurant.save();
      } else {
        res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
        return;
      }
  
      res.status(201).json({
        success: true,
        message: "Menu added successfully",
        menu,
      });
    } catch (error) {
      console.error("Error in addMenu:", error);
      next(error); // Forward error to the error-handling middleware
    }
  };

export const editMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    const menu = await Menu.findById(id);
    if (!menu) {
      res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
      return;
    }

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
      menu.image = imageUrl;
    }

    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
  } catch (error) {
    next(error); // Forward errors to Express error handler
  }
};
