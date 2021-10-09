import React from 'react';
import {
    Flex, Heading, Box, Spacer,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Nav: React.FC = () => (
    <Flex as="nav" backgroundColor="tomato">
        <Box p="2">
            <RouterLink to="/"><Heading size="md">Neo Currency Converter</Heading></RouterLink>
        </Box>

        <Spacer />

        <Box>
            <ThemeToggle />
        </Box>
    </Flex>
);

export default Nav;
