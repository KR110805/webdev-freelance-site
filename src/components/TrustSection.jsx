import { motion } from 'framer-motion';

const TRUST_POINTS = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        title: 'Fast Delivery',
        description: 'Quick turnaround without compromising quality. Your website goes live on time, every time.',
        color: 'amber',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
        title: 'Modern & Clean Design',
        description: 'Premium, responsive websites built with the latest technologies and design trends.',
        color: 'indigo',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
        title: 'Direct Communication',
        description: 'No middleman. You work directly with me — clear updates, fast responses, and zero confusion.',
        color: 'green',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const COLOR_MAP = {
    amber: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'hover:border-amber-500/30',
        glow: 'group-hover:bg-amber-500/20',
    },
    indigo: {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        border: 'hover:border-indigo-500/30',
        glow: 'group-hover:bg-indigo-500/20',
    },
    green: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'hover:border-green-500/30',
        glow: 'group-hover:bg-green-500/20',
    },
};

/**
 * Trust Section — "Why Work With Me?"
 * - 3 trust-building points with icons
 * - Stagger animation on scroll
 */
const TrustSection = () => (
    <section className="py-24 md:py-32 px-6 relative">
        {/* Background accent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
                    Trust
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Why Work{' '}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        With Me?
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                    I keep things simple, fast, and professional so you can focus on growing your business.
                </p>
            </motion.div>

            {/* Trust cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {TRUST_POINTS.map((point) => {
                    const colors = COLOR_MAP[point.color];
                    return (
                        <motion.div
                            key={point.title}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className={`group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 ${colors.border} transition-all duration-300`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} ${colors.glow} flex items-center justify-center transition-colors duration-300`}>
                                {point.icon}
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-zinc-100">{point.title}</h3>
                            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{point.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    </section>
);

export default TrustSection;
