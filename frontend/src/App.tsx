import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import { HomePage } from './pages/HomePage.js';
import { FitnessPage } from './pages/FitnessPage.js';
import { PhysicalTherapyPage } from './pages/PhysicalTherapyPage.js';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/physical-therapy" element={<PhysicalTherapyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
