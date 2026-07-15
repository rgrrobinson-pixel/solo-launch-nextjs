'use client';

import { useState } from 'react';

interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  layout?: 'inline' | 'stacked';
}

export function Newsletter({
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter and get the latest updates delivered to your inbox.',
  buttonText = 'Subscribe',
  layout = 'inline',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // TODO: Replace with actual newsletter API endpoint
      // Example: Mailchimp, ConvertKit, or custom endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const isInline = layout === 'inline';

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12">
      <div className={`max-w-4xl mx-auto ${isInline ? 'md:flex md:items-center md:justify-between' : 'text-center'}`}>
        <div className={isInline ? 'md:flex-1' : 'mb-6'}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-blue-100 text-lg">
            {description}
          </p>
        </div>

        <div className={`${isInline ? 'md:ml-8 md:flex-shrink-0 mt-6 md:mt-0' : 'max-w-md mx-auto'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 px-5 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : buttonText}
              </button>
            </div>

            {message && (
              <div
                className={`text-sm p-3 rounded-lg ${
                  status === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-xs text-blue-100 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
