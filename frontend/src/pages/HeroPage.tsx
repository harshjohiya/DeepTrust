import ParticleEffectForHero from '@/components/ui/particle-effect-for-hero';

interface HeroPageProps {
  onStartClick: () => void;
  onAboutClick?: () => void;
}

export default function HeroPage({ onStartClick, onAboutClick }: HeroPageProps) {
  return <ParticleEffectForHero onStartClick={onStartClick} onAboutClick={onAboutClick} />;
}
