import React from 'react';
import CurrencyComponent from './components/currencyComponent';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Hi There!</h1>
            <CurrencyComponent />
        </div>
    );
};

export default App;
