import React, { useState } from 'react';
import { WeekAheadLayout } from './WeekAheadLayout';
import { CelticCrossLayout } from './CelticCrossLayout';
import { ReadingMatLayout } from './ReadingMatLayout';

const Readings = (): JSX.Element => {
    const [readingType, setReadingType] = useState<string>('');
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ setReadingType:', setReadingType);
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ readingType:', readingType);

    return (
        <div className="h-screen bg-neutral-800">
            <ReadingMatLayout name="The Celtic Cross">
                <CelticCrossLayout />
            </ReadingMatLayout>
            <ReadingMatLayout name="The Week Ahead">
                <WeekAheadLayout />
            </ReadingMatLayout>
        </div>
    );
};

export default Readings;
