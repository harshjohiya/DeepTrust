import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

export type Verdict = 'REAL' | 'FAKE' | 'UNCERTAIN';

interface ResultCardProps {
  verdict: Verdict;
  confidence: number;
  explanation: string;
}

const verdictConfig = {
  REAL: {
    icon: CheckCircle2,
    label: 'Authentic',
    description: 'This media appears to be genuine',
    bgClass: 'bg-success-muted',
    textClass: 'text-success',
    badgeClass: 'verdict-real',
    barClass: 'bg-success',
  },
  FAKE: {
    icon: XCircle,
    label: 'Manipulated',
    description: 'AI-generated or altered content detected',
    bgClass: 'bg-danger-muted',
    textClass: 'text-danger',
    badgeClass: 'verdict-fake',
    barClass: 'bg-danger',
  },
  UNCERTAIN: {
    icon: AlertCircle,
    label: 'Uncertain',
    description: 'Unable to make a confident determination',
    bgClass: 'bg-warning-muted',
    textClass: 'text-warning',
    badgeClass: 'verdict-uncertain',
    barClass: 'bg-warning',
  },
};

export const ResultCard = ({ verdict, confidence, explanation }: ResultCardProps) => {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  return (
    <div className="animate-scale-in">
      <div className={`rounded-2xl ${config.bgClass} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${config.badgeClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`text-2xl font-semibold ${config.textClass}`}>
                {config.label}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}>
                {verdict}
              </span>
            </div>
            <p className="text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Confidence Score</span>
          </div>
          <span className={`text-2xl font-bold ${config.textClass}`}>
            {confidence}%
          </span>
        </div>
        
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.barClass} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          Higher confidence indicates stronger model certainty
        </p>
      </div>

      {/* Explanation */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="font-medium text-foreground mb-3">Analysis Summary</h4>
        <p className="text-muted-foreground leading-relaxed">
          {explanation}
        </p>
      </div>
    </div>
  );
};
