'use client';

import { useState } from 'react';
import { SiteSettings } from '@/lib/types';

interface ChatWidgetProps {
  settings: SiteSettings;
}

export default function ChatWidget({ settings }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);

  const greeting =
    settings.chatGreeting ?? `Hi! Welcome to ${settings.siteName ?? 'our site'}. How can we help?`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden">
          <div className="bg-brand-600 px-4 py-3 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">{settings.siteName ?? 'Chat'}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-lg leading-none"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700">{greeting}</p>
            {settings.chatUrl && (
              <a
                href={settings.chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block w-full text-center bg-brand-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-brand-700 transition-colors"
              >
                Start Chat
              </a>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-colors flex items-center justify-center"
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
