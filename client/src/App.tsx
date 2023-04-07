import React from 'react';
// import TarotMainPage from '@client/components/TarotPageComponents';
// import RadioQuiz from './components/RadioQuiz';
import Readings from './components/TarotPageComponents/Readings';
// import Hooks from './components/lesson/Hooks';

const App = (): JSX.Element => (
    <div className="min-h-screen w-100">
        {/* <RadioQuiz /> */}
        {/* <TarotMainPage /> */}
        <Readings />
        {/* <Hooks title="only a string" /> */}
    </div>
);

export default App;
