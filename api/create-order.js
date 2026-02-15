/**
 * POST /api/create-order
 *
 * Creates a Razorpay order with a SERVER-DEFINED amount.
 * The client sends the plan name; the server looks up the price
 * from a hardcoded map — preventing amount tampering.
 *
 * Body: { plan: "Starter" | "Growth" | "Pro" }
 * Returns: { orderId, amount, currency }
 */

import Razorpay from 'razorpay';

// Server-side price map — single source of truth
const PLAN_PRICES = {
    Starter: 1999,
    Growth: 3499,
    Pro: 5999,
};

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { plan } = req.body;

    // Validate plan name
    if (!plan || !PLAN_PRICES[plan]) {
        return res.status(400).json({ error: 'Invalid plan name' });
    }

    const amount = PLAN_PRICES[plan];

    // Validate environment variables early
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error('Missing Razorpay credentials. Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in Vercel Environment Variables.');
        return res.status(500).json({ error: 'Payment service is not configured' });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert INR to paisa
            currency: 'INR',
            notes: {
                plan,
                amount_inr: amount,
            },
        });

        return res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (err) {
        console.error('Razorpay order creation failed:', err.message || err);
        return res.status(500).json({ error: 'Failed to create order' });
    }
}
