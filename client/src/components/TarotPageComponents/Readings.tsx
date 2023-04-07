import React, { useState, useEffect } from 'react';
import { WeekAheadLayout } from './WeekAheadLayout';
import { CelticCrossLayout } from './CelticCrossLayout';
import { RelationshipLayout } from './RelationshipLayout';
import { ReadingMatLayout } from './ReadingMatLayout';
import { fetchCardDrawing } from '@client/axiosApi/tarotApi';
import { CardT } from '.';

const Readings = (): JSX.Element => {
    const [cardDrawing, setCardDrawing] = useState<CardT[] | null>(null);

    const handleDrawing = async () => {
        const responseData = await fetchCardDrawing(10);
        setCardDrawing(responseData);
    };

    useEffect(() => {
        if (!cardDrawing) {
            handleDrawing();
        }
    }, []);

    return (
        <div className="min-h-screen bg-neutral-800">
            <ReadingMatLayout name="Celtic Cross">
                <CelticCrossLayout cards={cardDrawing} />
            </ReadingMatLayout>
            <ReadingMatLayout name="Week Ahead">
                <WeekAheadLayout />
            </ReadingMatLayout>
            <ReadingMatLayout name="Relationship spread">
                <RelationshipLayout />
            </ReadingMatLayout>
        </div>
    );
};

export default Readings;
