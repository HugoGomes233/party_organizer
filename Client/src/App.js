import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login/Login.jsx'
import Header from './components/nav_bar/NavBar.jsx';
import './App.css';

const App = () => {
  return (
    <div className="App">
     <Header/>

     <Routes>
        <Route path="/" >
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
     <Login/>
    </div>
  );
}

export default App;
