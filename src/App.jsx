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
import ImageGallery from './components/ImageGallary';
import { shellTownGallery } from './data/gallarydata';
import { orangeTownGallery } from './data/orangegallarydata';
import { syrupVillageGallery } from './data/syrupgallarydata';
import { baratieGallery } from './data/baratiegallarydata';
import { gosaGallery } from './data/gosagallarydata';
import { logueGallery } from './data/loguegallarydata';
import confetti from 'canvas-confetti';

function App() {
  const [islands, setIslands] = useState(initialIslands);
  const [currentIsland, setCurrentIsland] = useState(islands[0]);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [isJoined, setIsJoined] = useState(false);
  const [codename, setCodename] = useState("");
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const [showFooshaQuiz, setShowFooshaQuiz] = useState(false);
  const [showShellTownGallery, setShowShellTownGallery] = useState(false);
  const [showOrangeTownGallery, setShowOrangeTownGallery] = useState(false);
  const [showSyrupVillageGallery, setShowSyrupVillageGallery] = useState(false);
  const [showBaratieGallery, setShowBaratieGallery] = useState(false);
  const [showGosaGallery, setShowGosaGallery] = useState(false);
  const [showLogueGallery, setShowLogueGallery] = useState(false);
  const [showPathToShell, setShowPathToShell] = useState(false);
  const [showPathToOrange, setShowPathToOrange] = useState(false);
  const [showPathToSyrup, setShowPathToSyrup] = useState(false);
  const [showPathToBaratie, setShowPathToBaratie] = useState(false);
  const [showPathToGosa, setShowPathToGosa] = useState(false);
  const [showPathToLogue, setShowPathToLogue] = useState(false);
  const [showPathToReverseMountain, setShowPathToReverseMountain] = useState(false);
  // const [isGrandLine, setIsGrandLine] = useState(false);
  const [grandLineStep, setGrandLineStep] = useState(0);
  const [isClimbing, setIsClimbing] = useState(false);

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
      } else if (island.id === 2) {
        setShowShellTownGallery(true);
      } else if (island.id === 3) {
        setShowOrangeTownGallery(true);
      } else if (island.id === 4) {
        setShowSyrupVillageGallery(true);
       }
      else if (island.id === 5) {
        setShowBaratieGallery(true);
      }
      else if (island.id === 6) {
        setShowGosaGallery(true);
      }
      else if (island.id === 7) {
        setShowLogueGallery(true);
      }
      else if (island.id === 8) {
        handleReverseMountain();
      }
      else {
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

  const handleShellTownGalleryComplete = () => {
    setShowShellTownGallery(false);
    setShowPathToOrange(true);
    const nextIsland = islands.find(island => island.id === 3);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 3) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(3);
    }
  };

  const handleOrangeTownGalleryComplete = () => {
    setShowOrangeTownGallery(false);
    setShowPathToSyrup(true);

    const nextIsland = islands.find(island => island.id === 4);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 4) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(4);
    }
  };

  const handleSyrupVillageGalleryComplete = () => {
    setShowSyrupVillageGallery(false);
    setShowPathToBaratie(true);

    const nextIsland = islands.find(island => island.id === 5);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 5) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(5);
    }
  };

  const handleBaratieGalleryComplete = () => {
    setShowBaratieGallery(false);
    setShowPathToGosa(true);

    const nextIsland = islands.find(island => island.id === 6);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 6) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(6);
    }
  };

  const handleGosaGalleryComplete = () => {
    setShowGosaGallery(false);
    setShowPathToLogue(true);

    const nextIsland = islands.find(island => island.id === 7);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 7) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(7);
    }
  };

  const handleLogueGalleryComplete = () => {
    setShowLogueGallery(false);
    setShowPathToReverseMountain(true);

    const nextIsland = islands.find(island => island.id === 8);

    if (nextIsland) {
      const updatedIslands = islands.map(island => {
        if (island.id === 8) {
          return { ...island, unlocked: true };
        }
        return island;
      });
      setIslands(updatedIslands);
      setCurrentIsland(nextIsland);
      setUnlockedLevel(8);
    }
  };

  const handleReverseMountain = () => {
    setIsClimbing(true); // Start the ship animation
    
    // After 3 seconds (ship climb time), show the Letter
    setTimeout(() => {
      // setIsGrandLine(true);
      setGrandLineStep(1);
      triggerConfetti(); // Optional: trigger a small burst here
    }, 3000);
  };

  const handleFinalAccept = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // Blue and Gold confetti for the sea and treasure
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }, colors: ['#00BFFF', '#FFD700', '#FFFFFF'] });
    }, 250);
  };


  return (
    <div className="app-container">
      {showFooshaQuiz && <FooshaQuiz onComplete={handleFooshaQuizComplete} />}
      {showShellTownGallery && <ImageGallery photos={shellTownGallery} onClose={handleShellTownGalleryComplete} />}
      {showOrangeTownGallery && <ImageGallery photos={orangeTownGallery} onClose={handleOrangeTownGalleryComplete} />}
      {showSyrupVillageGallery && <ImageGallery photos={syrupVillageGallery} onClose={handleSyrupVillageGalleryComplete} />}
      {showBaratieGallery && <ImageGallery photos={baratieGallery} onClose={handleBaratieGalleryComplete} />}
      {showGosaGallery && <ImageGallery photos={gosaGallery} onClose={handleGosaGalleryComplete} />}
      {showLogueGallery && <ImageGallery photos={logueGallery} onClose={handleLogueGalleryComplete} />}
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

            <motion.img
            src={shipImg}
            className="ship"
            animate={isClimbing ? { 
              left: "98%", 
              top: "2%", 
              rotate: -45 
            } : { 
              left: `${currentIsland.x}%`, 
              top: `${currentIsland.y}%`,
              rotate: 0
            }}
            transition={{ duration: isClimbing ? 3 : 1.5, ease: "easeInOut" }}
          />

            {/* {isGrandLine && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="final-letter-overlay"
              >
                <div className="letter-paper">
                  <h1 className="pirate-font">Log: Entrance to the Grand Line</h1>
                  <p className="letter-text">
                    The East Blue was just our prologue. We've weathered the storms, 
                    shared the meals, and found the treasure in each other. 
                    The Grand Line is unpredictable, but I don't want to sail it with anyone else.
                  </p>
                  
                  <h2 className="big-question">Ready to be the Official Captain of my heart?</h2>
                  
                  <div className="final-actions">
                    <button className="accept-btn" onClick={handleFinalAccept}>
                      AYE AYE, CAPTAIN! (YES)
                    </button>
                  </div>
                </div>
              </motion.div>
            )} */}
            {grandLineStep > 0 && (
              <div className="final-letter-overlay">
              {/* PHASE 1: THE THANK YOU SCROLL */}
              {grandLineStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="final-letter-overlay scroll-bg"
                >
                  <motion.div 
                    initial={{ y: 100, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    className="scroll-paper"
                  >
                    <h1 className="pirate-font scroll-title">Log: East Blue Cleared</h1>
                    
                    <div className="scroll-body-text">
                      <p>To Walter ....</p>
                      <p>Thank you so much for your effort during our journey through the East Blue!...</p>
                      <p>I appreciate all the memories we've made together, all the love that you are showering on me. ^^</p>
                      <p>I wrote down one last log entry for us, but it's locked inside this envelope...</p>
                    </div>

                    {/* The Button styled like a sealed wax letter */}
                    <button 
                      className="sealed-letter-btn" 
                      onClick={() => setGrandLineStep(2)}
                    >
                      <span className="wax-seal">✉️</span>
                      <p className="pirate-font">Open Captain's Log</p>
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* PHASE 2: THE GRAND LINE FINALE */}
              {grandLineStep === 2 && (
                <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="final-letter-overlay"
              >
                <div className="letter-paper">
                  <h1 className="pirate-font">Log: Entrance to the Grand Line</h1>
                  <p className="letter-text">
                    The East Blue was just our prologue. We've weathered the storms, 
                    shared the meals, and found the treasure in each other. 
                    The Grand Line is unpredictable, but I don't want to sail it with anyone else.
                  </p>
                  
                  <h2 className="big-question">Ready to be the Official Captain of my heart?</h2>
                  
                  <div className="final-actions">
                    <button className="accept-btn" onClick={handleFinalAccept}>
                      AYE AYE, CAPTAIN! (YES)
                    </button>
                  </div>
                </div>
              </motion.div>
              )}

              </div>
            )}

            {/* --- 6. Conditionally render the path --- */}
            {showPathToShell && (
              <PathLine from={islands.find(i => i.id === 1)} to={islands.find(i => i.id === 2)} />
            )}

            {showPathToOrange && (
              <PathLine from={islands.find(i => i.id === 2)} to={islands.find(i => i.id === 3)} />
            )}

            {showPathToSyrup && (
              <PathLine from={islands.find(i => i.id === 3)} to={islands.find(i => i.id === 4)} />
            )}

            {showPathToBaratie && (
              <PathLine from={islands.find(i => i.id === 4)} to={islands.find(i => i.id === 5)} />
            )}

            {showPathToGosa && (
              <PathLine from={islands.find(i => i.id === 5)} to={islands.find(i => i.id === 6)} />
            )}

            {showPathToLogue && (
              <PathLine from={islands.find(i => i.id === 6)} to={islands.find(i => i.id === 7)} />
            )}

            {showPathToReverseMountain && (
              <PathLine from={islands.find(i => i.id === 7)} to={islands.find(i => i.id === 8)} />
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
