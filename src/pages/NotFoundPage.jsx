import { Link } from 'react-router-dom';


export default function NotFoundPage()
{
    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <img className="h-60 w-60" src="/images/404.jpeg" alt="Image" />
                <h1 className="text-7xl">404 Page Not Found</h1>
                <span className="text-md mt-3">Like he said People = Sh*t, so gtfo</span>
                <Link className="bg-transparent border p-4 rounded-lg mt-8 active:scale-75" to="/">Back to Menu</Link>

            </div>
        </>
    );
}