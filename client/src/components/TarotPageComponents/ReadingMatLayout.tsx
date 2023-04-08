import React, { useState, SyntheticEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { LAYOUT_PAGE_DATA, LayoutPageDataType } from '@client/constants/layoutLegend';
import { PositionList } from './PositionList';

export const ReadingMatLayout = (): JSX.Element => {
    const [layout, setLayout] = useState<LayoutPageDataType>(LAYOUT_PAGE_DATA[0]);

    const handleSelectChange = (event: SyntheticEvent<HTMLSelectElement>) => {
        const ele = event.target as HTMLSelectElement;
        const found = LAYOUT_PAGE_DATA.find((item) => item.layoutName === ele.value);
        if (found) {
            setLayout(found);
        }
    };
    return (
        <div className="container mx-auto border-4 border-neutral-500 bg-neutral-900 p-3 mb-4">
            <select
                className="bg-transparent text-neutral-300 border-0 selection:bg-red-400"
                name="layout"
                value={layout.layoutName}
                onChange={handleSelectChange}
            >
                {LAYOUT_PAGE_DATA.map((item) => (
                    <option className="bg-transparent text-neutral-900" key={uuid()}>
                        {item.layoutName}
                    </option>
                ))}
            </select>
            <div className="mt-6 mb-2 md:flex md:justify-center md:flex-row md:items-center md:pb-6">
                {layout.layoutComponent}
            </div>
            <PositionList list={layout.layoutLegend} />
        </div>
    );
};
