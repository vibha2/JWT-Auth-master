import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import Background from './components/Background/Background';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Background/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
