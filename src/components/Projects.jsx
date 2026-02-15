import { motion } from 'framer-motion';
import collegeEventImg from '../assets/college-event.png';
import portfolioImg from '../assets/portfolio.png';
import corporateImg from '../assets/corporate.png';

const PROJECTS = [
    {
        title: 'College Event Website',
        description:
            'Modern cultural fest website with event highlights and responsive design.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: collegeEventImg,
        liveUrl: 'https://dhruva-2026-b548e.web.app',
        githubUrl: 'https://github.com/KR110805',
    },
    {
        title: 'Developer Portfolio',
        description:
            'Personal branding website with smooth animations and dark theme UI.',
        tags: ['React', 'Tailwind', 'Framer Motion'],
        image: portfolioImg,
        liveUrl: 'https://portfolio-b4mk.vercel.app/',
        githubUrl: 'https://github.com/KR110805',
    },
    {
        title: 'Corporate Website',
        description:
            'Professional business website focused on credibility and clean layout.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: corporateImg,
        liveUrl: 'https://www.amw-resources.com/',
        githubUrl: 'https://github.com/KR110805',
    },
];

// Stagger animation for project cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Projects Section
 * - Real project data with image previews
 * - Stagger animation on scroll
 * - Live demo and optional GitHub links
 * - Hover lift effect on cards
 */
const Projects = () => (
    <section id="projects" className="py-24 md:py-32 px-6">
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
                    Portfolio
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Recent{' '}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                    Here are some of my recent projects. Each one is crafted with
                    attention to detail, performance, and user experience.
                </p>
            </motion.div>

            {/* Project cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {PROJECTS.map((project) => (
                    <motion.div
                        key={project.title}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="group rounded-2xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
                    >
                        {/* Project image with overlay */}
                        <div className="relative overflow-hidden h-48">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                        </div>

                        {/* Project details */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="mt-5 flex gap-3">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-200"
                                >
                                    Live Demo
                                </a>
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2.5 text-sm font-medium border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-lg transition-colors duration-200"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Projects;
