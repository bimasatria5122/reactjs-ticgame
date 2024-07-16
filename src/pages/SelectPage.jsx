import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Card from '../components/Card.jsx';
import idolsData from '../../public/idols.json';


export default function SelectPage()
{

  const [idols, setIdols] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('G-1e8e6c2b');

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const [selectedIdols, setSelectedIdols] = useState({});
  const clickSound = new Audio('/sounds/select.mp3');
  const clickSoundFail = new Audio('/sounds/fail.mp3');

  const history = useNavigate();


  useEffect(() => {
    const selectedGroupData = idolsData.idols.filter(idol => idol.group_id === selectedGroup);
    const idolsWithGroup = selectedGroupData.map(idol => ({
        ...idol,
        group: idolsData.groups.find(group => group.id === idol.group_id)
    }));
    setIdols(idolsWithGroup);
  }, [selectedGroup]);


  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('show'));
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100 + 500); 
    });
  }, [idols]);



  const resetSelection = () => {
    setPlayer1('');
    setPlayer2('');
    setSelectedIdols({});
  };


  const startMatch = () => {
    if (player1 && player2) {
        history('/game',{state: { player1, player2 } });
    } 
    else if(!player1)
    {
      alert('Please select characters for player 1');

    }
    else {
        alert('Please select characters for player 2');
    }
  };

  const handleCardClick = (idol) => {

    if (selectedIdols[idol.id]) return;

    if (player1 === '') {
      clickSound.play();
      setPlayer1(idol);
      setSelectedIdols({ ...selectedIdols, [idol.id]: 'player1' });
    } else if (player2 === '') {
      clickSound.play();
      setPlayer2(idol);
      setSelectedIdols({ ...selectedIdols, [idol.id]: 'player2' });
    }
    else
    {
      clickSoundFail.play();
    }

  };


  return(
      <>
        <div className="flex max-h-screen items-center">
          <div className="flex h-1/2 w-full">
          
            <div className="grid w-full lg:grid-cols-4 md:grid-cols-1 sm:items-center overflow-hidden">

              <div className="container ">
                {player1 && (
                  <div className="flex flex-col items-center text-center animate-slide-left" id="p1Fig" style={{backgroundImage: "url('/images/char-bg-left.png')",
                    backgroundSize: '90%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left',
                    backgroundBlendMode: 'hard-light',
                    
                  }}>
                    <>
                      <img className='h-1/2 w-1/2' src={ `/images/figures/${player1.figure}`} alt={player1.name} />
                      <h2 className="text-7xl">{player1.name}</h2>
                    </>
                  
                  </div>
                )}
              </div>



              <div className="container col-span-2 flex justify-center flex-col">
                <div className="flex justify-center mb-8 gap-3">
                  {idolsData.groups.map(group => (
                    <button key={group.id} onClick={() => setSelectedGroup(group.id)}>
                      {group.name}
                    </button>
                  ))}
                </div>

                <section className="flex justify-center container-content mt-4 flex-wrap">
                  {idols.map((idol) => {
                    return(<Card acard={selectedIdols[idol.id] ? true : false} onClick={() => handleCardClick(idol)}  key={`${idol.id}`} idol={idol} />);
                    }
                  )}
                </section>

                <div className="flex justify-center gap-3 mt-5">    
                  <button onClick={startMatch}>Start Match</button>
                  <button onClick={resetSelection}>Reset Selection</button>
                  <Link to="/">
                    <button>Back to Menu</button>
                  </Link>
                </div>
              </div>


              <div className="container">
                {player2 && ( 
                  <div className="fig flex flex-col items-center text-center animate-slide-right" id="p2Fig" style={{backgroundImage: "url('/images/char-bg-right.png')",
                    backgroundSize: '90%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    backgroundBlendMode: 'soft-light',
                  }}>
                    
                  <>
                    <img className='h-1/2 w-1/2' src={ `/images/figures/${player2.figure}`} alt={player2.name} />
                    <h2 className="text-7xl">{player2.name}</h2>
                  </>
                    
                  </div>
                )}
              </div>


            </div>
          
          </div>            
        </div>
        
      </>
  );
}