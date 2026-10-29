import React, { useState } from 'react';
import { GITHUB_URL } from '../constants';

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

  return (
    <div className="view contact">
      <div className="container grid">
        <div className="contact__head">
          <h1>Get in touch</h1>
          <p className="lead">
            Need a Flutter or full-stack developer in Madagascar, or a remote collaborator? Let’s
            build something useful together.
          </p>

          <dl className="contact__facts">
            <dt>Email</dt>
            <dd>
              <a href="mailto:manassehrandriamitsiry@gmail.com">manassehrandriamitsiry@gmail.com</a>
            </dd>
            <dt>GitHub</dt>
            <dd>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                manasseh-randriamitsiry
              </a>
            </dd>
            <dt>Based in</dt>
            <dd>Fianarantsoa, Madagascar</dd>
          </dl>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="field__label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="field"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project."
            rows={4}
            required
          />
          <p className="field__hint">Sends from your own mail app.</p>
          <button type="submit" className="btn btn--primary">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};
