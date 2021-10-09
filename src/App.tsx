import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Navbar';
import CurrencyComponent from './pages/CurrencyPage';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <Router>
                <Nav />
                <Route exact path="/" component={LandingPage} />
                <Route path="/currency" component={CurrencyComponent} />
            </Router>
        </ChakraProvider>
    );
};

export default App;
