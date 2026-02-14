import { motion } from 'framer-motion';

const SKILLS = ['HTML', 'CSS', 'Vanilla JavaScript', 'React.js'];

// Stagger entrance for pill badges
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/**
 * About Section — Frontend Specialist
 * - Intro paragraph about skills and approach
 * - Animated skill badges with hover effects
 */
const About = () => (
    <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
                    About Me
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Frontend{' '}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Specialist
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    I&apos;m a passionate frontend developer who loves building clean,
                    modern websites. With a strong focus on performance and user
                    experience, I help businesses establish a powerful online presence that
                    drives results.
                </p>
            </motion.div>

            {/* Skill badges */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="flex flex-wrap items-center justify-center gap-4"
            >
                {SKILLS.map((skill) => (
                    <motion.span
                        key={skill}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="px-6 py-3 text-sm font-medium bg-zinc-900/60 border border-zinc-800/60 text-zinc-200 rounded-full hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors duration-300 cursor-default"
                    >
                        {skill}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    </section>
);

export default About;
