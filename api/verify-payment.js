/**
 * POST /api/verify-payment
 *
 * Verifies Razorpay payment signature using HMAC-SHA256.
 * This ensures the payment wasn't spoofed by the client.
 *
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, amount }
 * Returns: { verified: true, paymentId } or 403
 */

import crypto from 'crypto';

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        plan,
        amount,
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: 'Missing payment details' });
    }

    try {
        // Generate expected signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        // Compare signatures
        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            console.warn('Payment verification failed:', {
                razorpay_order_id,
                razorpay_payment_id,
            });
            return res.status(403).json({ verified: false, error: 'Invalid signature' });
        }

        // ✅ Payment verified — log for records
        console.log('✅ Payment verified:', {
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            plan: plan || 'unknown',
            amount: amount || 'unknown',
            timestamp: new Date().toISOString(),
        });

        return res.status(200).json({
            verified: true,
            paymentId: razorpay_payment_id,
        });
    } catch (err) {
        console.error('Payment verification error:', err);
        return res.status(500).json({ error: 'Verification failed' });
    }
}
