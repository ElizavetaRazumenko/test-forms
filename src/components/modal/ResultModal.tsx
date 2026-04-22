import { useLoanFormContext } from '../../context/use-loan-form-context.ts';

export const ResultModal: React.FC = () => {
  const { formValues, isResultModalOpen, closeResultModal } = useLoanFormContext();

  if (!isResultModalOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <article
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-modal-title"
      >
        <h2 id="result-modal-title">Заявка отправлена</h2>
        <p>
          Поздравляем, {formValues.lastName} {formValues.firstName}. Вам одобрена{' '}
          {formValues.loanAmount}$ на {formValues.loanTerm} дней.
        </p>
        <button type="button" className="button button--primary" onClick={closeResultModal}>
          Закрыть
        </button>
      </article>
    </div>
  );
};
