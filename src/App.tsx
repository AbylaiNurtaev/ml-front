import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateVacancy from './pages/CreateVacancy';
import CreateProfile from './pages/CreateProfile';
import VacanciesList from './pages/VacanciesList';
import ProfilesList from './pages/ProfilesList';
import VacancyDetail from './pages/VacancyDetail';
import ProfileDetail from './pages/ProfileDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vacancies/create" element={<CreateVacancy />} />
          <Route path="/profiles/create" element={<CreateProfile />} />
          <Route path="/vacancies" element={<VacanciesList />} />
          <Route path="/profiles" element={<ProfilesList />} />
          <Route path="/vacancies/:id" element={<VacancyDetail />} />
          <Route path="/profiles/:id" element={<ProfileDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

