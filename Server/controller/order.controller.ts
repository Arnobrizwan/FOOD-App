import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Create Stripe checkout session
// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ["card"],
//   shipping_address_collection: { allowed_countries: ["GB", "US", "CA"] },
//   line_items: lineItems,
//   mode: "payment",
//   success_url: `${process.env.FRONTEND_URL}/order/status`,
//   cancel_url: `${process.env.FRONTEND_URL}/cart`,
//   metadata: {
//     orderId: order.id.toString(),
//     images: JSON.stringify(restaurant.menus.map((item: any) => item.image)),
//   },
// });

// if (!session.url) {
//   res.status(400).json({ success: false, message: "Error while creating session" });
//   return;
// }

// const signature = req.headers["stripe-signature"];
// const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

// let event: Stripe.Event;

// try {
//   event = stripe.webhooks.constructEvent(payloadString, signature as string, secret);
// } catch (error: any) {
//   console.error("Webhook error:", error.message);
//   res.status(400).send(`Webhook error: ${error.message}`);
//   return;
// }

// if (event.type === "checkout.session.completed") {
//   const session = event.data.object as Stripe.Checkout.Session;
//   const orderId = session.metadata?.orderId;

//   if (!orderId) {
//     res.status(400).json({ message: "Order ID missing in metadata" });
//     return;
//   }

//   order.totalAmount = session.amount_total || 0;
