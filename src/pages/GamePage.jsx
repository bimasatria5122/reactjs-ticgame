import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board';


function GamePage()
{
  const nav     = useNavigate();
  const bgm = new Audio('/sounds/bgm.mp3');
  
  
  useEffect(() => {
    bgm.play();
    bgm.loop = true;

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const location = useLocation();
  const { player1 = 'Unknown', player2 = 'Unknown'} = location.state;
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return(
          <>
            <div className="flex max-h-screen items-center">
              <div className="flex w-full">
              
                <div className="grid w-full lg:grid-cols-4 md:grid-cols-1 sm:items-center">

                  <div className="container">
                    <div className={`flex flex-col items-center text-center ${(!xIsNext) ? 'opacity-15' : '' }`} id="p1Fig" style={{backgroundImage: "url('/images/char-bg-left.png')",
                      backgroundSize: '90%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'left',
                      backgroundBlendMode: 'hard-light',
                      
                    }}>

                      {player1 && (
                        <>
                          <img className='h-1/2 w-1/2' src={ `/images/figures/${player1.figure}`} alt={player1.name} />
                          <h2 className="text-7xl">{player1.name}</h2>
                        </>
                      )}
                    </div>
                  </div>


                  <div className="container col-span-2 flex justify-center flex-col">
                    <div className="flex flex-col items-center justify-center mb-8 gap-3">
                      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} player1={player1} player2={player2} />
                    </div>


                    <button onClick={ () => { nav('/select') }}>Back</button>
                    <button onClick={ () => { nav('/leaderboard') }}>Leaderboard</button>
                  </div>


                  <div className="container">
                    <div className={`flex flex-col items-center text-center ${(xIsNext) ? 'opacity-15' : '' }`} id="p2Fig" style={{backgroundImage: "url('/images/char-bg-right.png')",
                      backgroundSize: '90%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right',
                      backgroundBlendMode: 'soft-light',
                    }}>
                      {player2 && (
                        <>
                          <img className='h-1/2 w-1/2' src={ `/images/figures/${player2.figure}`} alt={player2.name} />
                          <h2 className="text-7xl">{player2.name}</h2>
                        </>
                      )}
                    </div>
                  </div>


                </div>

              </div>          
            </div>


    
    </>
  );
    
}

export default GamePage;