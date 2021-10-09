import React from 'react';
import { v4 } from 'uuid';
import { historyType } from '../../types';

interface props {
    history: historyType[];
}

const HistoryComponent: React.FC<props> = ({ history }) => {
    return (
        <ol>
            <h2>
                You have
                {' '}
                {history.length}
                {' '}
                items in your history
            </h2>
            {history.map((h: historyType) => (
                <li key={v4()}>
                    {h.date}
                    {' '}
                    {h.conversion}
                </li>
            ))}
        </ol>
    );
};

export default HistoryComponent;
