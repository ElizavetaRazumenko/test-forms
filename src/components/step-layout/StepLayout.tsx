type Props = {
  title: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
};

export const StepLayout: React.FC<Props> = ({
  title,
  step,
  totalSteps,
  children,
}) => (
  <section className="step-layout">
    <header className="step-layout__header">
      <p className="step-layout__meta">
        Шаг {step} из {totalSteps}
      </p>
      <h1>{title}</h1>
    </header>
    {children}
  </section>
);
