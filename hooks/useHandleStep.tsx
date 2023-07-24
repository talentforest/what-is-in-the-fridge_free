import { useState } from 'react';
import { FormStep } from '../constant/formInfo';

export default function useHandleStep(formSteps: FormStep[]) {
  const [currentStep, setCurrentStep] = useState<FormStep>({
    id: 1,
    name: '식품 정보',
  });

  const goNextStep = (currentStepId: number) => {
    if (currentStepId + 1 > formSteps.length) return;
    setCurrentStep(() => formSteps[currentStepId]);
  };

  const goPreviousStep = (currentStepId: number) => {
    if (currentStepId <= 1) return;
    setCurrentStep(() => formSteps[currentStepId - 2]);
  };

  return {
    currentStep,
    setCurrentStep,
    goNextStep,
    goPreviousStep,
  };
}
