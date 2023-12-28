import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Error404 from './components/Error404';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error404 />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
