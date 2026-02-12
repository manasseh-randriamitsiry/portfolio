import React, { useState } from 'react';

export const ContactView: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
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
        // Create mailto link with form data
        const mailtoLink = `mailto:manassehrandriamitsiry@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="max-w-2xl mx-auto pb-32">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Let's Connect</h1>
                <p className="text-on-surface-variant text-base">
                    Have a project in mind or just want to chat? Drop me a message!
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <a
                    href="mailto:manassehrandriamitsiry@gmail.com"
                    className="bg-primary-container/30 dark:bg-primary-container/20 border border-outline-variant/20 rounded-3xl p-6 flex items-start gap-4 hover:bg-primary-container/50 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="material-icons-round text-on-primary">email</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-on-surface mb-1">Email</h3>
                        <p className="text-sm text-on-surface-variant break-all">manassehrandriamitsiry@gmail.com</p>
                    </div>
                </a>

                <a
                    href="https://github.com/manasseh-randriamitsiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary-container/30 dark:bg-secondary-container/20 border border-outline-variant/20 rounded-3xl p-6 flex items-start gap-4 hover:bg-secondary-container/50 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <span className="material-icons-round text-on-secondary">code</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-on-surface mb-1">GitHub</h3>
                        <p className="text-sm text-on-surface-variant">@manasseh-randriamitsiry</p>
                    </div>
                </a>
            </div>

            {/* Contact Form */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
                        <span className="material-icons-round text-on-tertiary-container">send</span>
                    </div>
                    <h2 className="text-xl font-bold text-on-surface">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-on-surface-variant mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant/30 rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-on-surface-variant mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant/30 rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Subject Input */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-on-surface-variant mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant/30 rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Project Inquiry"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-on-surface-variant mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant/30 rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                            placeholder="Tell me about your project or just say hi..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-full transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <span>Send Message</span>
                        <span className="material-icons-round">arrow_forward</span>
                    </button>
                </form>

                <p className="text-xs text-on-surface-variant mt-4 text-center">
                    This will open your default email client with the message pre-filled
                </p>
            </div>
        </div>
    );
};
