import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Deep<span className="text-primary">Trust</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
