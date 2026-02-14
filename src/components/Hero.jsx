import { motion } from 'framer-motion';

/**
 * Hero Section
 * - Full-screen intro with animated gradient orb background
 * - Bold headline, subtext, and CTA buttons
 * - Fade-in entrance animation
 */
const Hero = () => {
    // Smooth scroll to a section by ID
    const scrollTo = (id) => {
        const element = document.querySelector(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient orb — adds depth and premium feel */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl"
                />
            </div>

            {/* Secondary orb for visual interest */}
            <div className="absolute top-20 right-10 md:right-32">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                    className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl"
                />
            </div>

            {/* Hero content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Tagline pill */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-8">
                        Freelance Web Developer
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                >
                    Building Modern Websites
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        That Feel Premium.
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                >
                    I help students, startups and small businesses build fast, responsive
                    and conversion-focused websites.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary CTA — View Work */}
                    <button
                        onClick={() => scrollTo('#projects')}
                        className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
                    >
                        View Work
                    </button>

                    {/* Secondary CTA — Hire Me */}
                    <button
                        onClick={() => scrollTo('#contact')}
                        className="px-8 py-3.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium rounded-lg transition-all duration-300 cursor-pointer"
                    >
                        Hire Me
                    </button>
                </motion.div>

                {/* Social proof line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-8 text-sm text-zinc-500 tracking-wide"
                >
                    Already built multiple live websites and ready to take your project next.
                </motion.p>
            </div>


        </section>
    );
};

export default Hero;
