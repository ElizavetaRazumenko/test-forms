import { Navigate, Route, Routes } from 'react-router-dom';
import { ResultModal } from './components/modal/ResultModal.tsx';
import { LoanFormProvider } from './context/loan-form-context.tsx';
import { AddressWorkPage } from './pages/address-work-page/AddressWorkPage.tsx';
import { LoanParamsPage } from './pages/loan-params-page/LoanParamsPage.tsx';
import { PersonalDataPage } from './pages/personal-data-page/PersonalDataPage.tsx';
import './App.css';

export const App: React.FC = () => (
  <LoanFormProvider>
    <main className="app-container">
      <Routes>
        <Route path="/" element={<PersonalDataPage />} />
        <Route path="/address-work" element={<AddressWorkPage />} />
        <Route path="/loan-params" element={<LoanParamsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ResultModal />
    </main>
  </LoanFormProvider>
);
