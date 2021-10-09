import React from 'react';
import {
    Table, Tbody, Td, Tfoot, Th, Thead, Tr,
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import { historyType } from '../../types';

interface props {
    history: historyType[];
}

const HistoryComponent: React.FC<props> = ({ history }) => {
    return (
        <Table size="md">
            <Thead>
                <Tr>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Result</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Date</Th>
                </Tr>
            </Thead>
            <Tbody>

                {history.slice().reverse().map((h: historyType) => (
                    <Tr key={v4()}>
                        <Td isNumeric>
                            {h.amount}
                            {' '}
                            {h.from}
                        </Td>
                        <Td isNumeric>
                            {h.result}
                            {' '}
                            {h.to}
                        </Td>
                        <Td>{h.from}</Td>
                        <Td>{h.to}</Td>
                        <Td>{h.date}</Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Result</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Date</Th>
                </Tr>
            </Tfoot>
        </Table>
    );
};

export default HistoryComponent;
