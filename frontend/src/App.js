import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import Background from './components/Background/Background';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UserHomePage from './components/UserHomePage/UserHomePage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Background/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='' element={<PrivateRoute />} >
              <Route path='/profile' element={<UserProfilePage />} />
          </Route>
          {/* <Route path="/user" element={<UserHomePage/>} /> */}
          {/* <PrivateRoute path="/" element={<UserHomePage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
