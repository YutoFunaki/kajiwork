import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/loginPage';
import Signin from './pages/signinPage';

function App() {
  return (
    <div className="App">
      <Signin />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
