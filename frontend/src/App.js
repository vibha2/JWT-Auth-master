import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import Background from './components/Background/Background';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import AdminPage from './components/AdminPage/AdminPage';
import AdminList from './components/AdminList/AdminList';

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
          <Route path='' element={<AdminPrivateRoute />} >
              <Route path='/admin' element={<AdminPage />} />
          </Route>
          <Route path="/adminlist" element={<AdminList/>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
