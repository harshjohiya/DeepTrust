import { Link } from 'react-router-dom';
import { Shield, Eye, Brain, Lock, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';

const features = [
  {
    icon: Eye,
    title: 'Advanced Detection',
    description: 'State-of-the-art neural networks analyze visual artifacts invisible to the human eye.',
  },
  {
    icon: Brain,
    title: 'Explainable AI',
    description: 'Grad-CAM visualizations show exactly which regions influenced the model\'s decision.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'All analysis happens securely. Your media is never stored or shared.',
  },
];

const trustedBy = [
  'Research Labs',
  'News Organizations', 
  'Security Teams',
  'Content Platforms',
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Media Verification</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Detect AI-generated media with{' '}
            <span className="gradient-text">transparency and trust</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            DeepTrust uses advanced neural networks to identify deepfakes and manipulated content, 
            providing clear explanations for every detection.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/detect" className="btn-hero flex items-center gap-2 group">
              Try Detection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/docs" 
              className="px-8 py-4 rounded-xl font-medium text-foreground hover:bg-accent transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Documentation
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustedBy.map((org, i) => (
                <div 
                  key={org}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
                >
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-muted-foreground">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for trust and transparency
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our detection system combines cutting-edge AI with explainable methods, 
              so you understand exactly why content is flagged.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="glass-card rounded-2xl p-8 hover:shadow-elevated transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to verify your media?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Upload an image or video to get instant authenticity analysis with full visual explanations.
              </p>
              <Link to="/detect" className="btn-hero inline-flex items-center gap-2 group">
                Start Detection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">DeepTrust</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 DeepTrust. Building trust in digital media.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
