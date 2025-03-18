import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import ChallengesPage from "./Challenges.jsx";
import TypingTest from "./Practice.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/challenges" element={<ChallengesPage/>}/>
        <Route path="/practice" element= {<TypingTest/>}/>
      </Routes>
    </Router>
  );
};

export default App;
