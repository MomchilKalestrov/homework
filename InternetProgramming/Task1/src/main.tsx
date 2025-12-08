import { createRoot } from 'react-dom/client';
import './index.css';
import SurveyForm from './components/survey-form';

createRoot(document.getElementById('root')!).render(
    <SurveyForm />
);
