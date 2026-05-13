import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { motion } from 'framer-motion';
import mapImg from './assets/one-piece-map.png';
import shipImg from './assets/going-merry-ship.png'; 
import { islands as initialIslands} from './data/islands';
import FooshaQuiz from './components/FooshaQuiz';
import PathLine from './components/PathLine';

function App() {
  const [islands, setIslands] = useState(initialIslands);
  const [currentIsland, setCurrentIsland] = useState(islands[0]);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [isJoined, setIsJoined] = useState(false);
  const [codename, setCodename] = useState("");
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const [showFooshaQuiz, setShowFooshaQuiz] = useState(false);
  const [showPathToShell, setShowPathToShell] = useState(false);

  const handleJoin = () => {
    if (codename.toLowerCase() === "pancetta") { 
      setIsJoined(true);
    } else {
      alert("Wrong codename! Ask your captain for the secret codename to join the crew.");
    }
  };

  const handleStartJourney = () => {
    setIsMapZoomed(true);
    // You can also hide the ship and bubble after clicking
  };

  const handleIslandClick = (island) => {
    if (island.id <= unlockedLevel) {
      // If it's the first island, show the quiz
      if (island.id === 1) {
        setShowFooshaQuiz(true);
      } else {
        // For other islands, just move the ship
        setCurrentIsland(island);
      }
    } else {
      alert("You haven't unlocked this island yet!");
    }
  };

  // --- Create the quiz completion handler ---
  const handleFooshaQuizComplete = () => {
    // Close the quiz modal
    setShowFooshaQuiz(false);

    // Show the path to the next island
    setShowPathToShell(true);

    // Find the next island to unlock and move to
    const nextIsland = islands.find(island => island.id === 2);

    if (nextIsland) {
      // Unlock the next island (id: 2)
      const updatedIslands = islands.map(island => {
        if (island.id === 2) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);

      // Move the ship to the new island
      setCurrentIsland(nextIsland);

      // Update the overall unlocked level
      setUnlockedLevel(2);
    }
  };

  return (
    <div className="app-container">
      {showFooshaQuiz && <FooshaQuiz onComplete={handleFooshaQuizComplete} />}

      {!isJoined ? (
        /* --- ENVELOPE SCREEN --- */
        <div className="entrance-screen">
          <div className="blur-bg"></div> {/* This will show the blurred map */}
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="envelope-card"
          >
            <h2 className="pirate-font">An Invitation to Adventure</h2>
            <p>Enter your codename to join my journey:</p>
            <input 
              type="text" 
              value={codename} 
              onChange={(e) => setCodename(e.target.value)}
              placeholder="Codename..."
            />
            <button onClick={handleJoin} className="pirate-button">OPEN</button>
          </motion.div>
        </div>
      ) : (
        /* --- THE ACTUAL MAP --- */
        <div className="map-view">
          {/* Your Map and Ship code goes here */}
          <div className={`map-container ${isMapZoomed ? 'zoomed' : ''}`}>
            {/* The Actual Map Image */}
            <img src={mapImg} alt="East Blue" className="map-image" />

            {/* --- 6. Conditionally render the path --- */}
            {showPathToShell && (
              <PathLine from={islands.find(i => i.id === 1)} to={islands.find(i => i.id === 2)} />
            )}

            {/* The Island Pins */}
            {isMapZoomed && islands.map((island) => (
              <button
                key={island.id}
                className={`pin ${island.unlocked ? 'unlocked' : 'locked'}`}
                style={{ left: `${island.x}%`, top: `${island.y}%` }}
                onClick={() => handleIslandClick(island)}
              >
                {island.unlocked ? '📍' : '🔒'}
              </button>
            ))}
          </div>

          {/* Ship and Start Bubble Container */}
          {!isMapZoomed && ( // <-- Conditionally render the ship and bubble
            <div className="ship-container" onClick={handleStartJourney}>
              <motion.div
                initial={{ x: 100, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                className="start-bubble"
                onClick={handleStartJourney} // <-- Add onClick handler here
              >
                Click me to start!
              </motion.div>
              <motion.img
                src={shipImg}
                className="ship"
                onClick={handleStartJourney} // <-- Also on the ship for bigger click area
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App
