import React, { useState } from 'react';

const MultiStepProgress = ({ steps, activeStep }) => {
  const [completedSteps, setCompletedSteps] = useState(activeStep); // For optional completed step visual cue

  const handleStepClick = (index) => {
    // Update active step if allowed (based on your logic)
    if (index <= completedSteps) { // Only allow navigation to completed steps
      setCompletedSteps(index); // Update completedSteps for visual indication
    }
  };

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <button
            type="button"
            className={`
              flex items-center justify-center rounded-full w-8 h-8 
              ${activeStep === index || index <= completedSteps ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}
            `}
            onClick={() => handleStepClick(index)}
          >
            {step}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`
                w-full h-px bg-gray-200
                ${activeStep > index || index <= completedSteps ? 'bg-blue-500' : ''}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MultiStepProgress;
