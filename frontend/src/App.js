import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage';
import Signin from './pages/signinPage';
import Home from './pages/homePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

