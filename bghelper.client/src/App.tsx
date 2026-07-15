import { useRegisterSW } from 'virtual:pwa-register/react';
import './App.css';

function App() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker,
    } = useRegisterSW();

    return (
        <main className="home">
            <h1>Board Game Helper</h1>
            <button className="primary-action" type="button">
                Board Game Rules
            </button>
            {(offlineReady || needRefresh) && (
                <aside className="pwa-notice" role="status" aria-live="polite">
                    <span>
                        {offlineReady
                            ? 'BGHelper is ready to use offline.'
                            : 'A new version of BGHelper is available.'}
                    </span>
                    <div className="pwa-actions">
                        {needRefresh && (
                            <button type="button" onClick={() => void updateServiceWorker(true)}>
                                Update
                            </button>
                        )}
                        <button
                            type="button"
                            className="secondary"
                            onClick={() => {
                                setOfflineReady(false);
                                setNeedRefresh(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </aside>
            )}
        </main>
    );
}

export default App;
