import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactView: React.FC = () => {
    const [formData, setFormData] = useState({
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:manassehrandriamitsiry@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(
            formData.message
        )}`;
        window.location.href = mailtoLink;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="flex-1 w-full max-w-[430px] mx-auto pb-24"
        >
            {/* Hero Title */}
            <motion.div variants={itemVariants} className="pt-10 pb-6 px-4">
                <h1 className="text-on-surface tracking-tight text-4xl font-extrabold leading-tight">
                    Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-on-surface-variant/80 mt-2 text-base">Need a Flutter or full-stack developer in Madagascar—or a remote collaborator? Let’s build something useful together.</p>
            </motion.div>

            {/* Contact Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5 px-4">

                <div className="flex flex-col gap-2">
                    <label className="text-on-surface-variant text-sm font-semibold px-1">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl border-none bg-primary/5 dark:bg-primary/10 text-on-surface focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant/50 p-4 text-base transition-all resize-none outline-none"
                        placeholder="Tell me about your project..."
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 px-6 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                >
                    <span>Send Message</span>
                    <span className="material-icons-round">send</span>
                </button>
            </motion.form>

            {/* Social Links Section */}
            <motion.div variants={itemVariants} className="mt-12 pb-10 px-4">
                {/* Direct Email Card */}
                <a
                    href="mailto:manassehrandriamitsiry@gmail.com"
                    className="mt-6 p-5 rounded-2xl border-2 border-dashed border-primary/30 flex items-center gap-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                    <div className="bg-primary text-on-primary p-3 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-icons-round">mail</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-bold text-primary uppercase">Direct Email</p>
                        <p className="text-on-surface font-semibold break-all">manassehrandriamitsiry@gmail.com</p>
                    </div>
                </a>
            </motion.div>
        </motion.div>
    );
};
