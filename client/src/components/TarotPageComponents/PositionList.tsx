import React from 'react';
import { v4 as uuid } from 'uuid';

export const PositionList = ({ list, readingDrawing }: { list: string[]; readingDrawing?: string[] }): JSX.Element => (
    <ol className="p-2 ml-3 text-neutral-500 text-xs md:text-base md:space-y-2 md:mr-24 list-decimal">
        <span>LEGEND</span>
        <hr className="pb-2 mt-2" />
        {list.map((item, index) => (
            <li key={uuid()}>
                <h4>
                    {item}
                    {readingDrawing !== undefined &&
                        readingDrawing.length > 0 &&
                        readingDrawing[index] !== undefined && <span> - {readingDrawing[index]}</span>}
                </h4>
            </li>
        ))}
    </ol>
);
