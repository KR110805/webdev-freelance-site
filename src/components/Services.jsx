import { motion } from 'framer-motion';

// Service offerings with icons and descriptions
const SERVICES = [
    {
        icon: '🖥️',
        title: 'Portfolio Websites',
        description:
            'Showcase your work with a stunning, custom-built portfolio that leaves a lasting impression on visitors and potential clients.',
        features: ['Custom Design', 'Responsive Layout', 'SEO Optimized'],
    },
    {
        icon: '🚀',
        title: 'Landing Pages',
        description:
            'High-converting landing pages designed to capture attention, generate leads, and drive action for your campaigns.',
        features: ['Conversion Focused', 'Fast Loading', 'A/B Test Ready'],
    },
    {
        icon: '💼',
        title: 'Business Websites',
        description:
            'Professional multi-page websites that establish credibility and help your business grow its digital footprint.',
        features: ['Multi-page', 'Contact Forms', 'Analytics Ready'],
    },
];

// Stagger animation config
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Services Section
 * - Glassmorphism-style cards
 * - Subtle hover animation with gradient border glow
 */
const Services = () => (
    <section id="services" className="py-24 md:py-32 px-6 relative">
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
                    What I Offer
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Services That{' '}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Deliver Results
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                    From concept to deployment — I build websites that look great, load
                    fast, and convert visitors into customers.
                </p>
            </motion.div>

            {/* Service cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {SERVICES.map((service) => (
                    <motion.div
                        key={service.title}
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="group relative p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-indigo-500/40 transition-all duration-300"
                    >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <span className="text-4xl">{service.icon}</span>
                            <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                            <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                                {service.description}
                            </p>

                            {/* Feature list */}
                            <ul className="mt-5 space-y-2">
                                {service.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2 text-sm text-zinc-500"
                                    >
                                        <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Services;
