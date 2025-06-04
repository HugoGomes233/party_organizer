import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login/Login.jsx'
import Header from './components/nav_bar/NavBar.jsx';
import Eventos from './screens/Eventos/Eventos.jsx';
import Galeria from './screens/Galeria/Galeria.jsx';
import Membros from './screens/Membros/Membros.jsx';
import { useAuth } from './auth/AuthContext.js';
import { ToastContainer } from 'react-toastify' 
import './App.css';

const App = () => {
  const { currentUser } = useAuth();


  return (
    <div className='app'>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false}  draggable={true} draggableDirection="x" draggablePercent="15"/> 
      {currentUser &&  
        <div>
            <Header />
        </div>
      }
      
      <div className={currentUser && ("content")}>
      <Routes>
          <Route path="/" element={<Navigate to={currentUser ? "/Eventos" : "/Login"} />} />
          <Route path="/Login" element={currentUser ? <Navigate to="/Eventos" /> : <Login />} />
          <Route path="/Eventos" element={currentUser ? <Eventos/> : <Navigate to="/Login" />} /> 
          <Route path="/Galeria" element={currentUser ? <Galeria/> : <Navigate to="/Login" />} />
          <Route path="/Membros" element={currentUser ? <Membros/> : <Navigate to="/Login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
