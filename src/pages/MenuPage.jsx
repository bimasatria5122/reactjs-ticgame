import { Link } from 'react-router-dom';

function MenuPage()
{

  return(
    <>
        <div className="flex h-screen items-center">
            <div className="flex h-1/2 lg:justify-between sm:justify-center w-full">
            
                <div className="hidden lg:block">
                    <img className="w-full h-full" src="/images/front.png" alt="Front" />
                </div>
                <div className="flex flex-col content-end lg:items-end md:items-center pr-4">
                    <h1 className="text-9xl mb-10">Tic Game</h1>
                    <Link className="text-6xl mb-5 text-transparent text-outline-light hover:text-white" to="/select">Start Game</Link>
                    <Link className="text-6xl mb-5 text-transparent text-outline-light hover:text-white" to="/leaderboard">Leaderboard</Link>
                    <Link className="text-6xl mb-5 text-transparent text-outline-light hover:text-white" to="/characterslist">List Characters</Link>
                </div>

            </div>
        </div>

    </>
  );
    
}


export default MenuPage;