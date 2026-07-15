import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'gradient' | 'minimal';
  alignment?: 'left' | 'center';
}

export function CTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
  alignment = 'center',
}: CTAProps) {
  const isCenter = alignment === 'center';

  const containerClasses = {
    default: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white',
    minimal: 'bg-gray-50 text-gray-900 border-2 border-gray-200',
  };

  const buttonPrimaryClasses = {
    default: 'bg-white text-gray-900 hover:bg-gray-100',
    gradient: 'bg-white text-blue-600 hover:bg-gray-50',
    minimal: 'bg-blue-600 text-white hover:bg-blue-700',
  };

  const buttonSecondaryClasses = {
    default: 'border-2 border-white text-white hover:bg-white hover:text-gray-900',
    gradient: 'border-2 border-white text-white hover:bg-white hover:text-blue-600',
    minimal: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  return (
    <div className={`rounded-2xl p-8 md:p-12 lg:p-16 ${containerClasses[variant]}`}>
      <div className={`max-w-4xl ${isCenter ? 'mx-auto text-center' : ''}`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h2>
        <p className={`text-lg md:text-xl mb-8 ${variant === 'default' || variant === 'gradient' ? 'text-gray-100' : 'text-gray-600'} ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {description}
        </p>

        {(primaryButton || secondaryButton) && (
          <div className={`flex flex-col sm:flex-row gap-4 ${isCenter ? 'justify-center' : ''}`}>
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className={`inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${buttonPrimaryClasses[variant]}`}
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className={`inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-200 ${buttonSecondaryClasses[variant]}`}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
