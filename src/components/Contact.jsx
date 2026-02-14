import { useState } from 'react';
import { motion } from 'framer-motion';

const CONTACT_METHODS = [
    {
        label: 'WhatsApp',
        subtitle: 'Quick response',
        href: 'https://wa.me/917030735948',
        hoverBorder: 'hover:border-green-500/30',
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        iconGlow: 'group-hover:bg-green-500/20',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        subtitle: "Let's connect",
        href: 'https://www.linkedin.com/in/kshitij-renge-19222b325',
        hoverBorder: 'hover:border-blue-500/30',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        iconGlow: 'group-hover:bg-blue-500/20',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        subtitle: 'kshitijrengepatil@gmail.com',
        href: 'mailto:kshitijrengepatil@gmail.com',
        hoverBorder: 'hover:border-indigo-500/30',
        iconBg: 'bg-indigo-500/10',
        iconColor: 'text-indigo-400',
        iconGlow: 'group-hover:bg-indigo-500/20',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
];

// Stagger for contact cards
const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * Contact Section
 * - Contact form (name, email, message)
 * - Clickable contact cards with icons and hover animations
 * - Minimal footer with copyright
 */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Portfolio Inquiry from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.open(
            `mailto:kshitijrengepatil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        );
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-24 md:py-32 px-6 relative">
            {/* Background accent */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
                        Get In Touch
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                        Let&apos;s{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Work Together
                        </span>
                    </h2>
                    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                        Have a project in mind? Drop me a message and I&apos;ll get back to
                        you within 24 hours.
                    </p>
                </motion.div>

                {/* Contact form & contact cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-8"
                >
                    {/* Form — spans 3 columns on desktop */}
                    <form
                        onSubmit={handleSubmit}
                        className="md:col-span-3 space-y-5"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact cards sidebar — spans 2 columns */}
                    <motion.div
                        variants={cardContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="md:col-span-2 flex flex-col gap-4"
                    >
                        {CONTACT_METHODS.map((method) => (
                            <motion.a
                                key={method.label}
                                variants={cardItemVariants}
                                whileHover={{ scale: 1.03, y: -2 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                href={method.href}
                                target={method.href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className={`flex items-center gap-4 p-5 bg-zinc-900/50 border border-zinc-800/50 rounded-xl ${method.hoverBorder} transition-all duration-300 group`}
                            >
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${method.iconBg} ${method.iconColor} ${method.iconGlow} transition-colors`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-200">{method.label}</p>
                                    <p className="text-xs text-zinc-500">{method.subtitle}</p>
                                </div>
                                {/* Arrow indicator */}
                                <svg className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="mt-24 pt-8 border-t border-zinc-800/50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} Kshitij Renge. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#home" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            Home
                        </a>
                        <a href="#about" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            About
                        </a>
                        <a href="#services" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            Services
                        </a>
                        <a href="#contact" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
