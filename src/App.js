// export default App;
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Write from './write/Write';
import ExMain from './Main/Main';
import Board from './Board/Board';
import Create from './Board/Create';
import DoLogin from './DoLogin/DoLogin';
import Join from './Join/Join';
import MainHome from './MainHome/MainHome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/main" element={<ExMain />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/board" element={<Board />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/dologin" element={<DoLogin />}/>
        <Route path="/join" element={<Join />}/>
        <Route path="/MainHome" element={<MainHome />}/>
      </Routes>
    </Router>
  );
}

export default App;
