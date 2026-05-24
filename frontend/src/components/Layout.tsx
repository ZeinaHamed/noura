import { Link, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const { pathname } = useLocation();

  const navLinks = [
    { to: '/fitness', label: 'Diet & Fitness', icon: '🏋️' },
    { to: '/physical-therapy', label: 'Physical Therapy', icon: '🩺' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-700 to-accent-700 bg-clip-text text-transparent">
              Noura
            </span>
          </Link>

          <nav className="flex gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
        Noura AI · For informational purposes only · Always consult a healthcare professional
      </footer>
    </div>
  );
}
