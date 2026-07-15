import { useRegisterSW } from 'virtual:pwa-register/react';
import { Route, Routes } from 'react-router';
import HomePage from './HomePage';
import BoardGameRulesPage from './rules/BoardGameRulesPage';
import './App.css';

function App() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker,
    } = useRegisterSW();

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/rules"
                    element={<BoardGameRulesPage />}
                />
            </Routes>

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
        </>
    );
}

export default App;
