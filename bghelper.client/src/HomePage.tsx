import { Link } from 'react-router';

function HomePage() {
    return (
        <main className="home">
            <h1>Board Game Helper</h1>

            <Link className="primary-action" to="/rules">
                Board Game Rules
            </Link>
        </main>
    );
}

export default HomePage;