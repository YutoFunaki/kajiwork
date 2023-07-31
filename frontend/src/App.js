import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signin from './components/signin';
import Top from './components/top';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Top />} />
        <Route path="Login" component={<Login />} />
        <Route path="Signin" component={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;

