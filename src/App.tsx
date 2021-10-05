import React from 'react';
import CurrencyInput from './components/currencyInput';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Hi There!</h1>
            <CurrencyInput />
        </div>
    );
};

export default App;
