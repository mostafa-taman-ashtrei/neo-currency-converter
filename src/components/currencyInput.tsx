import React, { useState } from 'react';
import convertCurrency from '../api/convertCurrency';
import currencyOptions from '../utils/currencies';

const CurrencyInput: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('JPY');
    const [amount, setAmount] = useState<number>(1);

    const handleSubmit = async () => {
        const res = await convertCurrency(fromCurrency, toCurrency, amount);
        if (res.data) {
            const conversion = `${amount} ${fromCurrency} is ${res.data.toFixed(2)} ${toCurrency}`;
            console.log(conversion);
        } else if (res.e) {
            return console.log(res.e);
        }
    };

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
        </>
    );
};

export default CurrencyInput;
