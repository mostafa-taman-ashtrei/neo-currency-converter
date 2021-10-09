import React, { useState } from 'react';
import {
    Select, Box, VStack, Button, IconButton, Center, Spinner, Spacer,
    NumberIncrementStepper, NumberInput, NumberDecrementStepper, NumberInputField, NumberInputStepper,
} from '@chakra-ui/react';
import { ArrowUpDownIcon, DeleteIcon } from '@chakra-ui/icons';
import convertCurrency from '../api/convertCurrency';
import useLocalStorage from '../hooks/useLocalStorage';
import { historyType } from '../types';
import currencyOptions from '../utils/currencies';
import speak from '../utils/speak';
import HistoryComponent from '../components/History';
import AlertComponent from '../components/Alert';

const CurrencyPage: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useLocalStorage<string>('fromCurrency', 'USD');
    const [toCurrency, setToCurrency] = useLocalStorage<string>('toCurrency', 'JPY');
    const [amount, setAmount] = useLocalStorage<number>('amount', 1);
    const [history, setHistory] = useLocalStorage<historyType[]>('history', []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await convertCurrency(fromCurrency, toCurrency, amount);

        if (res.e != null) {
            setLoading(false);
            return setError(res.e);
        }

        if (res.data != null) {
            const conversion = `${amount} ${fromCurrency} is ${res.data.toFixed(2)} ${toCurrency}`;
            console.log(conversion);

            setHistory([...history, {
                date: new Date().toISOString().slice(0, 10),
                amount,
                to: toCurrency,
                from: fromCurrency,
                result: res.data.toFixed(2),
            }]);
            speak(conversion);
        }

        return setLoading(false);
    };

    if (loading) {
        return (
            <Center>
                <Spinner
                    thickness="15px"
                    m={10}
                    speed="0.3s"
                    emptyColor="tomato"
                    color="black"
                    size="xl"
                />
            </Center>
        );
    }

    return (
        <Box m={3}>
            {error !== null ? <AlertComponent error={error} setError={setError} /> : null}
            <VStack
                m={3}
                spacing={4}
                align="center"
            >
                <Box h="40px">
                    <Select width="md" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencyOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </Select>
                </Box>
                <Box h="40px">
                    <IconButton
                        variant="outline"
                        color="tomato"
                        borderColor="tomato"
                        aria-label="Swipe currencies"
                        fontSize="20px"
                        icon={<ArrowUpDownIcon />}
                        onClick={() => {
                            setFromCurrency(toCurrency);
                            setToCurrency(fromCurrency);
                        }}
                    />
                </Box>
                <Box h="40px">
                    <Select width="md" color="tomato" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencyOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </Select>
                </Box>

                <Box h="40px">
                    <NumberInput
                        precision={2}
                        w="lg"
                        m={3}
                        min={0}
                        step={0.5}
                        value={parseFloat(amount)}
                        onChange={(e) => { setAmount(parseFloat(e)); }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>

                <Spacer />

                <Box h="40px">
                    <Button colorScheme="blackAlpha" width="md" color="tomato" borderColor="tomato" w="lg" onClick={() => handleSubmit()}>Convert</Button>
                </Box>
            </VStack>

            {
                history.length > 0
                    ? (
                        <Box m={3}>
                            <IconButton
                                variant="outline"
                                color="tomato"
                                borderColor="tomato"
                                aria-label="Clear History"
                                fontSize="20px"
                                icon={<DeleteIcon />}
                                onClick={() => setHistory([])}
                            />
                            <HistoryComponent history={history} />
                        </Box>
                    )
                    : null
            }
        </Box>
    );
};

export default CurrencyPage;
