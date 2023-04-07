import React, { useState, useRef, SyntheticEvent, MutableRefObject } from 'react';

type Props = {
    title: string;
};

const Hooks = ({ title }: Props): JSX.Element => {
    console.log('🚀 ~ file: Hooks.tsx:8 ~ Hooks ~ title:', title);
    const [count, setCount] = useState(0);
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (inputRef.current) {
            const inputValue = inputRef.current.value;
            console.log('🚀 ~ file: Hooks.tsx:16 ~ handleSubmit ~ inputValue:', inputValue);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={inputRef} />
                <button type="submit">Submit</button>
                {count}
            </form>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

export default Hooks;
