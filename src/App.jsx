import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import SelectPage from './pages/SelectPage';
import GamePage from './pages/GamePage';
import MenuPage from './pages/MenuPage';
import Leaderboard from './pages/Leaderboard';
import NotFoundPage from './pages/NotFoundPage';
import CharactersList from './pages/CharactersList';



function App() {

  return (
    <>

      <Router>
        <Routes>
            <Route path="/select" element={<SelectPage />}/>
            <Route path="/game" element={<GamePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" exact element={<MenuPage />} />
            <Route path="/characterslist" exact element={<CharactersList />} />
            <Route path="*" exact element={<NotFoundPage />} />
      </Routes>
    </Router>


    </>
  );
}

export default App;
