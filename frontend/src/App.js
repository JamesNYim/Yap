import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm/LoginForm';
import RegisterForm from './Pages/RegisterForm/RegisterForm';
import Home from './Pages/Home/Home';
function App() {
  return (
    <Router> 
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path ="/:username" element={<Home />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm/>}/>
        </Routes>
    </Router>
  );
}

export default App;
