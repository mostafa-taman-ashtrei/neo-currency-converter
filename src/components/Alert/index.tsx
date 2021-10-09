import React from 'react';
import {
    Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton,
} from '@chakra-ui/react';

interface props {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    error: string;
}

const AlertComponent: React.FC<props> = ({ error, setError }) => {
    return (
        <Alert status="error">
            <AlertIcon />
            <Box flex="1">
                <AlertTitle>Error !</AlertTitle>
                <AlertDescription display="block">
                    {error}
                </AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError(null)} />
        </Alert>
    );
};

export default AlertComponent;
