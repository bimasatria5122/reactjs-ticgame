export default function Card({ idol, onClick, acard })
{
  const backgroundImage ='/images/';

  return(
      <div className={'card cursor-pointer show '+(acard ? "card-active" : '') } onClick={onClick}>
        <div className="card-bg" style={{ backgroundImage: `url(${backgroundImage}${idol.photo})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end pb-4">
          
            <div className="card-info text-left px-3 py-2">
              <h2 className="card-title text-lg fw-bold">
                {idol.name}
              </h2>
              <span className="card-trademark text-xs">
                {idol.group.name}
              </span>
            </div>
            

            
          </div>
        </div>
      </div>
  );
}
