import React from 'react';
import Leaderboard from './components/Leaderboard';

class App extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <h1>Campers Leaderboard</h1>
                </header>
                <div className="row">
                    <Leaderboard />
                </div>
            </div>
        );
    }
}
export default App;
