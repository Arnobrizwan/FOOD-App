import { Request, Response, NextFunction } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";
import { asyncHandler } from "../middlewares/asyncHandler"; // For error handling utility

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Define a reusable type for CheckoutSessionRequest
interface CartItem {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface DeliveryDetails {
  name: string;
  email: string;
  address: string;
  city: string;
}

interface CheckoutSessionRequest {
  cartItems: CartItem[];
  deliveryDetails: DeliveryDetails;
  restaurantId: string;
}

// =========================== GET ORDERS ===========================
export const getOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const orders = await Order.find({ user: req.id }).populate("user").populate("restaurant");

  res.status(200).json({
    success: true,
    orders,
  });
});

// ==================== CREATE CHECKOUT SESSION ====================
export const createCheckoutSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { cartItems, deliveryDetails, restaurantId }: CheckoutSessionRequest = req.body;

  // Fetch restaurant and menus
  const restaurant = await Restaurant.findById(restaurantId).populate("menus");
  if (!restaurant) {
    res.status(404).json({ success: false, message: "Restaurant not found." });
    return;
  }

  // Create a new order
  const order = new Order({
    restaurant: restaurant._id,
    user: req.id,
    deliveryDetails,
    cartItems,
    status: "pending",
  });

  // Generate Stripe line items
  const lineItems = createLineItems(cartItems, restaurant.menus);

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["GB", "US", "CA"] },
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/order/status`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
    metadata: {
      orderId: order._id.toString(),
      images: JSON.stringify(restaurant.menus.map((item: any) => item.image)),
    },
  });

  if (!session.url) {
    res.status(400).json({ success: false, message: "Error while creating session" });
    return;
  }

  await order.save();

  res.status(200).json({
    success: true,
    sessionUrl: session.url,
  });
});

// =========================== STRIPE WEBHOOK ===========================
export const stripeWebhook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers["stripe-signature"];
  const payloadString = JSON.stringify(req.body, null, 2);
  const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, signature as string, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      res.status(400).json({ message: "Order ID missing in metadata" });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.totalAmount = session.amount_total || 0;
    order.status = "confirmed";

    await order.save();
  }

  res.status(200).send();
});

// =========================== CREATE LINE ITEMS ===========================
const createLineItems = (cartItems: CartItem[], menuItems: any[]): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
    if (!menuItem) throw new Error(`Menu item ID ${cartItem.menuId} not found`);

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
};
