import React from 'react';

type Props = { children: JSX.Element; name: string };

export const ReadingMatLayout = ({ children, name }: Props): JSX.Element => (
    <div className="container mx-auto border-4 border-neutral-500 bg-neutral-900 p-3 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-400">{name}</h2>
        <div className="md:flex md:justify-center md:flex-row md:items-center md:pb-6">{children}</div>
    </div>
);
