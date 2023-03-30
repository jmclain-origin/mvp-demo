import React from 'react';
import { v4 as uuid } from 'uuid';

export const PositionList = ({ list }: { list: string[] }): JSX.Element => (
    <ol className="p-2 float-left md:float-none text-neutral-500 text-xs md:text-base md:space-y-2 md:mr-10 list-decimal">
        {list.map((item) => (
            <li key={uuid()}>{item}</li>
        ))}
    </ol>
);
