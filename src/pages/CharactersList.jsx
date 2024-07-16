import idolsData from '../../public/idols.json';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card.jsx';


export default function CharactersList()
{

    const [idols, setIdols] = useState([]);
    const [selectedIdol, setSelectedIdol] = useState({id:null});


    const handleCardClick = (idol) => {
        setSelectedIdol(idol);
    }

    useEffect(() => {
        setIdols(idolsData.idols.map(idol => ({
            ...idol,
            group: idolsData.groups.find(group => group.id === idol.group_id)
        })));
    }, []);


    return(
        <>

            <div className="grid grid-cols-4 gap-4 h-screen overflow-hidden">
                <section className="col-span-1 flex flex-wrap p-2 pb-12 h-full container-content justify-center mt-4 overflow-y-scroll rounded-xl">
                    {idols.map((idol) => (
                        <Card
                            key={idol.id}
                            acard={selectedIdol.id === idol.id}
                            onClick={() => handleCardClick(idol)}
                            idol={idol}
                        />
                    ))}
                </section>

                <section className="col-span-1 p-4 flex flex-col justify-between">
                    <Link to="/">
                        <button>Back to Menu</button>
                    </Link>
                    {selectedIdol.id && (
                        <>
                            <div className='pb-12 flex flex-col gap-2'>
                                <h2 className="text-6xl mb-2">{selectedIdol.name}</h2>
                                <span className='text-sm'>Character ID : {selectedIdol.id}</span>
                                <span className='text-sm'>Group : {selectedIdol.group.name}</span>
                            </div>
                        </>
                    )}
                </section>

                <section className="col-span-2 flex justify-center items-center">
                    {selectedIdol.id && (
                        <>
                            <div className="flex flex-col items-center text-center animate-slide-right w-full h-full relative">
                                <div className="opacity-45" style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url('/images/${selectedIdol.photo}')`,
                                    WebkitMaskImage: `url('/images/char-bg-right.png')`, 
                                    maskImage: `url('/images/char-bg-right.png')`, 
                                    backgroundSize: '100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right',
                                    backgroundBlendMode: 'hard-light',
                                    zIndex:-99,
                                }}>
                                </div>
                                <img className="h-full" src={`/images/figures/${selectedIdol.figure}`} alt={selectedIdol.name} />
                            </div>
                        </>
                    )}
                </section>
            </div>
 
        </>
    );
}