import axios from 'axios';
import { currencyData } from '../types';

const convertCurrency = async (from: string, to: string, amount: number) => {
    try {
        const res = await axios.get<currencyData>(
            `${process.env.REACT_APP_API_URL!}${from}&to=${to}&amount=${amount}`,
            {
                headers: {
                    'x-rapidapi-host': 'currency-converter13.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_API_KEY!,
                },
            },
        );

        console.log(res.data);

        if (res.status !== 200) return { e: res.statusText, data: null };
        return { e: null, data: parseFloat(res.data.amount) };
    } catch (e) {
        console.log(e);
        return { e: 'Failed to fetch data', data: null };
    }
};

export default convertCurrency;
