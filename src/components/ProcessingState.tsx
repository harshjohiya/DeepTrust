import { useState, useEffect } from 'react';
import { Scan, Eye, Brain, Shield } from 'lucide-react';

const processingSteps = [
  { icon: Scan, text: "Analyzing visual artifacts…" },
  { icon: Eye, text: "Detecting facial inconsistencies…" },
  { icon: Brain, text: "Evaluating neural patterns…" },
  { icon: Shield, text: "Generating authenticity report…" },
];

export const ProcessingState = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processingSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = processingSteps[currentStep].icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      {/* Animated scanner ring */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
          style={{ animationDuration: '1.5s' }}
        />
        
        {/* Inner pulse */}
        <div className="absolute inset-4 rounded-full bg-accent animate-pulse-slow" />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <CurrentIcon className="w-10 h-10 text-primary animate-scan" />
        </div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-lg font-medium text-foreground mb-2 h-7 animate-fade-in" key={currentStep}>
          {processingSteps[currentStep].text}
        </p>
        <p className="text-sm text-muted-foreground">
          This may take a few moments
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {processingSteps.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentStep 
                ? 'bg-primary w-6' 
                : index < currentStep 
                  ? 'bg-primary/60' 
                  : 'bg-border'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};
