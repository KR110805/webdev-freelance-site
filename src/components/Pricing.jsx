import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Pricing Data ──────────────────────────────────────────────
// Display-only data. Actual amounts are enforced server-side.
const PRICING_TIERS = [
    {
        name: 'Starter',
        price: '₹1,999',
        description: 'Perfect for students & personal portfolios.',
        features: [
            '1-page responsive website',
            'Basic animations',
            'Contact form',
            '3-day delivery',
            '1 revision',
        ],
        highlighted: false,
    },
    {
        name: 'Growth',
        price: '₹3,499',
        description: 'Ideal for freelancers & professionals.',
        features: [
            'Up to 3 pages',
            'Modern UI design',
            'Smooth animations',
            'Contact form',
            'Social media links',
            'Basic SEO setup',
            '5-day delivery',
            '2 revisions',
        ],
        highlighted: true,
    },
    {
        name: 'Pro',
        price: '₹5,999',
        description: 'Best for small businesses.',
        features: [
            'Up to 5 pages',
            'Premium layout',
            'Advanced animations',
            'WhatsApp integration',
            'Basic SEO',
            'Performance optimization',
            '7-day delivery',
            '3 revisions',
        ],
        highlighted: false,
    },
];

// WhatsApp redirect after successful payment
const WHATSAPP_URL = 'https://wa.me/917030735948?text=Hi%2C+I+just+completed+a+payment+for+a+website+project.+Let%27s+discuss+next+steps!';

// ── Animation Variants ───────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Toast animation
const toastVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
};

// ── Toast Component ──────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
    <motion.div
        variants={toastVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 right-6 z-50 max-w-sm px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm ${type === 'success'
                ? 'bg-green-900/90 border-green-700/50 text-green-100'
                : type === 'error'
                    ? 'bg-red-900/90 border-red-700/50 text-red-100'
                    : 'bg-zinc-900/90 border-zinc-700/50 text-zinc-100'
            }`}
    >
        <div className="flex items-start gap-3">
            {/* Icon */}
            {type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors cursor-pointer" aria-label="Close toast">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </motion.div>
);

// ── Pricing Section ──────────────────────────────────────────
const Pricing = () => {
    const [loadingPlan, setLoadingPlan] = useState(null);
    const [toast, setToast] = useState(null);

    // Show a toast notification (auto-dismiss after 5s)
    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    }, []);

    /**
     * Secure payment flow:
     * 1. Create order on server (amount is server-defined)
     * 2. Open Razorpay checkout with order_id
     * 3. Verify signature on server
     * 4. Show success + redirect to WhatsApp
     */
    const handlePayment = useCallback(async (planName) => {
        // Guard: Check if Razorpay script loaded
        if (!window.Razorpay) {
            showToast('Payment system is loading. Please try again in a moment.', 'error');
            return;
        }

        // Guard: Prevent duplicate clicks
        if (loadingPlan) return;
        setLoadingPlan(planName);

        try {
            // Step 1: Create order on server
            const orderRes = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: planName }),
            });

            if (!orderRes.ok) {
                const err = await orderRes.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to create order');
            }

            const { orderId, amount, currency } = await orderRes.json();

            // Step 2: Open Razorpay checkout
            const options = {
                key: 'rzp_test_SG72AfidpngyGY',
                amount,
                currency,
                name: 'KR1119',
                description: `${planName} Plan`,
                order_id: orderId,
                handler: async (response) => {
                    // Step 3: Verify payment on server
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                plan: planName,
                                amount: amount / 100,
                            }),
                        });

                        const result = await verifyRes.json();

                        if (result.verified) {
                            showToast(`✅ Payment successful for ${planName} Plan! Redirecting to WhatsApp...`, 'success');
                            setTimeout(() => {
                                window.open(WHATSAPP_URL, '_blank');
                            }, 2000);
                        } else {
                            showToast('Payment verification failed. Please contact support.', 'error');
                        }
                    } catch {
                        showToast('Could not verify payment. Please contact support.', 'error');
                    }

                    setLoadingPlan(null);
                },
                modal: {
                    ondismiss: () => {
                        setLoadingPlan(null);
                        showToast('Payment cancelled. You can try again anytime.', 'info');
                    },
                },
                theme: {
                    color: '#6366f1',
                },
            };

            const rzp = new window.Razorpay(options);

            // Handle payment failures
            rzp.on('payment.failed', (response) => {
                console.error('Payment failed:', response.error);
                showToast(
                    `Payment failed: ${response.error.description || 'Something went wrong'}. Please try again.`,
                    'error'
                );
                setLoadingPlan(null);
            });

            rzp.open();
        } catch (err) {
            console.error('Payment error:', err);
            showToast(err.message || 'Something went wrong. Please try again.', 'error');
            setLoadingPlan(null);
        }
    }, [loadingPlan, showToast]);

    return (
        <>
            <section id="pricing" className="py-24 md:py-32 px-6 relative bg-zinc-950">
                {/* Soft background glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* ── Section Header ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
                            Pricing
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-100">
                            Simple Pricing for{' '}
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Growing Brands
                            </span>
                        </h2>
                        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                            Affordable plans tailored for students, freelancers and small businesses.
                        </p>
                    </motion.div>

                    {/* ── Pricing Cards Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                    >
                        {PRICING_TIERS.map((tier) => {
                            const isLoading = loadingPlan === tier.name;

                            return (
                                <motion.div
                                    key={tier.name}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${tier.highlighted
                                            ? 'bg-zinc-900 border-indigo-500 shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)]'
                                            : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                                        }`}
                                >
                                    {/* "Most Popular" badge */}
                                    {tier.highlighted && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="px-4 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/30">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    {/* Plan name & description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-100">{tier.name}</h3>
                                        <p className="mt-1 text-sm text-zinc-500">{tier.description}</p>

                                        {/* Price */}
                                        <div className="mt-6">
                                            <span className="text-4xl font-bold text-zinc-100">{tier.price}</span>
                                            <span className="text-zinc-500 ml-1 text-sm">/project</span>
                                        </div>

                                        {/* Features checklist */}
                                        <ul className="mt-8 space-y-3">
                                            {tier.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3 text-sm text-zinc-300"
                                                >
                                                    <svg
                                                        className={`w-4 h-4 flex-shrink-0 ${tier.highlighted ? 'text-indigo-400' : 'text-zinc-600'
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA button with loading state */}
                                    <button
                                        onClick={() => handlePayment(tier.name)}
                                        disabled={!!loadingPlan}
                                        className={`mt-8 w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${tier.highlighted
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40'
                                                : 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                                            } ${loadingPlan ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                {/* Spinner */}
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Get Started'
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Toast notifications */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Pricing;
