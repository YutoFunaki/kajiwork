import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage';
import Signin from './pages/signinPage';
import Home from './pages/homePage';
import CompleteWorkPage from './pages/completeWorkPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Home" element={<Home />} />
        <Route path="completeForm" element={<CompleteWorkPage />} />
      </Routes>
    </div>
  );
}

export default App;

