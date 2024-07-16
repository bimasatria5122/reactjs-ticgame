import { useSelector } from 'react-redux';
import idolsData from '../../public/idols.json'; 
import { Link } from 'react-router-dom';

function Leaderboard()
{
    
  const matches = useSelector((state) => state.leaderboard);

  const winCounts = {};
  matches.forEach((match) => {
    const winnerId = match.playerWin;
    if (winCounts[winnerId]) {
      winCounts[winnerId]++;
    } else {
      winCounts[winnerId] = 1;
    }
  });

  idolsData.idols.forEach((idol) => {
    if (!winCounts[idol.id]) {
      winCounts[idol.id] = 0;
    }
  });

  const sortedIdols = [...idolsData.idols].sort((a, b) => winCounts[b.id] - winCounts[a.id]);

console.log(matches);
    return(
        <>
            <div className="flex justify-center min-h-screen items-center">
                <div className="container">
                  <Link to="/">
                    <button>Back to Menu</button>
                  </Link>
                    <h1 className="text-3xl text-center mb-8">Leaderboard</h1>
                    <div className="flex flex-col items-center gap-3">
                        {sortedIdols.map((idol,index) => (
                        <div className="border w-full p-4 flex justify-between rounded-lg" key={idol.id}>
                            <div className='flex gap-3 items-center'>
                                <span>{index+1}</span>
                                <img src={`images/${idol.photo}`} className='inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover' alt={idol.name} />
                                <h3>{idol.name}</h3> 
                            </div>
                            <span className='text-4xl'>{winCounts[idol.id]} {winCounts[idol.id] === 1 ? 'Win' : 'Wins'}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;