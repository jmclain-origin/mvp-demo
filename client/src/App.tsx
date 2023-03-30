import React from 'react';
// import TarotMainPage from '@client/components/TarotPageComponents';
import ReadingsLayout from './components/TarotPageComponents/Readings';

const App = (): JSX.Element => (
    <div className="min-h-screen w-100">
        {/* <RadioQuiz /> */}
        {/* <TarotMainPage /> */}
        <ReadingsLayout />
    </div>
);

export default App;
