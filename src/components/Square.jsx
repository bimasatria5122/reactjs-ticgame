export default function Square({ value, onSquareClick }) {
  const path = "/images/icons/"+value;
  return (
    <button className="square h-40 w-40 text-center border" onClick={onSquareClick}>
      { value && (<img className="w-full h-full" src={path} alt="" />) }
    </button>
  );
}