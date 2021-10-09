import React, { useState } from 'react';
import convertCurrency from '../api/convertCurrency';
import useLocalStorage from '../hooks/useLocalStorage';
import { historyType } from '../types';
import currencyOptions from '../utils/currencies';
import speak from '../utils/speak';
import HistoryComponent from '../components/History';

const CurrencyPage: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useLocalStorage<string>('fromCurrency', 'USD');
    const [toCurrency, setToCurrency] = useLocalStorage<string>('toCurrency', 'JPY');
    const [amount, setAmount] = useLocalStorage<number>('amount', 1);
    const [history, setHistory] = useLocalStorage<historyType[]>('history', []);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await convertCurrency(fromCurrency, toCurrency, amount);

        if (res.e != null) alert(`Error: ${res.e}`);

        else if (res.data != null) {
            const conversion = `${amount} ${fromCurrency} is ${res.data.toFixed(2)} ${toCurrency}`;
            console.log(conversion);
            setHistory([...history, { date: new Date().toISOString().slice(0, 10), conversion }]);
            speak(conversion);
        }

        return setLoading(false);
    };

    if (loading) return <h1>Loading ...</h1>;

    return (
        <>
            <input
                type="number"
                className="input"
                value={amount}
                onChange={(e) => {
                    if (parseFloat(e.target.value) > 0) return setAmount(parseFloat(e.target.value));
                    return alert('Amount has to be 1 or higher');
                }}
            />

            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <br />

            <button
                type="button"
                onClick={() => {
                    setFromCurrency(toCurrency);
                    setToCurrency(fromCurrency);
                }}
            >
                ↔️
            </button>
            <br />

            <button type="button" onClick={() => handleSubmit()}>Convert</button>
            <br />

            {history.length > 0
                ? (
                    <>
                        <button type="button" onClick={() => setHistory([])}>Clear history</button>
                        <HistoryComponent history={history} />
                    </>
                )
                : null}
        </>
    );
};

export default CurrencyPage;
