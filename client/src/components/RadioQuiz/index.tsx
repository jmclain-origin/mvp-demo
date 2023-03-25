import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AtSymbol } from 'heroicons-react';
import { v4 as uuid } from 'uuid';
import { mockData as DATA } from '@client/assets/mockData';
import { renderHeadingText } from '@client/utils/renderHeadingText';
import { navigateIndex } from '@client/utils/navigateIndex';
import { StateT, QuestionT, RadioCheckedT, AnswerT } from './types';

const RadioQuiz: FC = () => {
    const [state, setState] = useState<StateT>({
        questionList: [...DATA],
        questionIndex: null,
        answerHistory: [],
        canProceed: false,
        isChecked: { answer1: false, answer2: false, answer3: false, answer4: false },
        isCompleted: false,
        finalScore: 0,
    });
    const { questionList, questionIndex, canProceed, isChecked, isCompleted, finalScore } = state;
    useEffect(() => {
        setState((prevState) => {
            const shuffledList: QuestionT[] = [];
            const copyStateData = [...prevState.questionList];
            while (shuffledList.length < DATA.length) {
                const randomIndex = Math.floor(Math.random() * DATA.length);
                if (!shuffledList.find(({ id }) => copyStateData[randomIndex].id === id)) {
                    shuffledList.push(copyStateData[randomIndex]);
                }
            }
            return {
                ...prevState,
                questionList: shuffledList,
            };
        });
    }, []);
    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const targetEle = event.target as HTMLInputElement;
        const radioKey = targetEle.id;
        setState((prevState) => {
            const copyState = { ...prevState };
            const checkKeyCopy = { ...copyState.isChecked };
            for (const key in checkKeyCopy) {
                checkKeyCopy[key as keyof RadioCheckedT] = false;
            }
            copyState.isChecked = checkKeyCopy;
            copyState.isChecked[radioKey as keyof RadioCheckedT] = targetEle.checked;
            return { ...copyState, canProceed: true };
        });
    };
    const handleNavigation = (scoreDirection?: number) => {
        setState((prevState) => {
            const copyRadioChecked = { ...prevState.isChecked };
            for (const key in copyRadioChecked) {
                copyRadioChecked[key as keyof RadioCheckedT] = false;
            }
            return {
                ...prevState,
                questionIndex: navigateIndex(prevState.questionIndex, prevState.questionList.length),
                answerHistory: scoreDirection
                    ? prevState.answerHistory.concat(scoreDirection)
                    : prevState.answerHistory.slice(0, -1),
                canProceed: false,
                isChecked: copyRadioChecked,
            };
        });
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();
        const formControls: HTMLFormControlsCollection = event.currentTarget.elements;
        let checkedScore = 0;
        for (const E in formControls) {
            const element = formControls[E] as HTMLInputElement;
            if (element.type === 'radio' && element.checked) checkedScore = parseInt(element.value);
        }
        const buttonEvent = event.nativeEvent.submitter as HTMLButtonElement;
        switch (buttonEvent.value) {
            case 'start':
                setState((prevState) => ({ ...prevState, questionIndex: 0 }));
                break;
            case 'next':
                handleNavigation(checkedScore);
                break;
            case 'previous':
                handleNavigation();
                break;
            case 'finish':
                handleNavigation(checkedScore);
                setState((prevState) => ({
                    ...prevState,
                    isCompleted: true,
                    finalScore: prevState.answerHistory.reduce((a, b) => a + b),
                }));
                break;
            case 'submit':
                console.log('��� ~ file: App.tsx:100 ~ SUBMIT EMAIL FEATURE ~', finalScore);
                break;
            default:
                break;
        }
    };
    // * grouping element based on logical render
    ResultsDisplay(isCompleted, finalScore);

    return (
        <div className="h-full pt-16">
            <div className="flex flex-col items-center justify-center px-3">
                <h1 className="text-4xl font-bold text-black">Assessment Questioner</h1>
                <div className="min-h-96 w-full sm:w-5/6 md:w-3/4 lg:w-2/4 xl:w-4/6 2xl:w-2/6 bg-zinc-400 mt-12 p-4 pb-8 rounded-lg shadow-xl">
                    <h2 className="text-center text-2xl mb-8 font-semibold">
                        {renderHeadingText(
                            questionIndex !== null ? questionList[questionIndex].question : '',
                            questionIndex,
                            isCompleted,
                        )}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center relative">
                        {FormInputs(questionIndex, isCompleted, questionList, isChecked, handleChange)}
                        {ResultsDisplay(isCompleted, finalScore)}
                        <div className="flex justify-around w-1/2 mt-3">
                            {FormNavigateButtons(questionIndex, isCompleted, questionList, canProceed)}
                        </div>
                        {questionIndex !== null && !isCompleted && (
                            <span className="absolute -top-28 lg:right-2">{`Question ${questionIndex + 1} of ${
                                questionList.length
                            }`}</span>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RadioQuiz;
/**
 * TODO: Refactor, render logic is to complex
 * ? simplify logic
 */
function FormInputs(
    questionIndex: number | null,
    isCompleted: boolean,
    questionList: { id: string; question: string; response: { answer: string; score: number }[] }[],
    isChecked: RadioCheckedT,
    handleChange: (event: SyntheticEvent<HTMLInputElement>) => void,
) {
    return (
        questionIndex !== null &&
        !isCompleted &&
        questionList[questionIndex].response.map((obj: AnswerT, index: number) => {
            const checked: boolean = isChecked[('answer' + (index + 1)) as keyof RadioCheckedT];
            return (
                <div
                    key={uuid()}
                    className="w-4/5 h-28 bg-neutral-100 pl-4 pr-8 py-8 mb-2 rounded-2xl shadow-md flex justify-start items-center"
                >
                    <div className="mr-2">
                        <input
                            type="radio"
                            id={`answer${index + 1}`}
                            className="accent-green-500 w-6 h-6 align-middle"
                            name="answer"
                            value={obj.score}
                            checked={checked}
                            onChange={handleChange}
                        />
                    </div>
                    <label className="px-2" htmlFor={`answer${index + 1}`}>
                        {`${obj.score}---${obj.answer}`}
                    </label>
                </div>
            );
        })
    );
}

function ResultsDisplay(isCompleted: boolean, finalScore: number) {
    return (
        isCompleted && (
            <>
                <h2 className="text-xl">Your score is {finalScore}</h2>
                <div className="w-1/3 relative">
                    <AtSymbol size={20} className="absolute inset-y-0 left-1 align-middle opacity-40 h-full" />
                    <input type="email" className="input-default pl-6" placeholder="Email address" />
                </div>
            </>
        )
    );
}

function FormNavigateButtons(
    questionIndex: number | null,
    isCompleted: boolean,
    questionList: { id: string; question: string; response: { answer: string; score: number }[] }[],
    canProceed: boolean,
) {
    return questionIndex !== null && !isCompleted ? (
        <>
            {questionIndex !== 0 && (
                <button type="submit" value="previous" className="btn-default">
                    <ChevronLeft className="w-5 h-5 inline" />
                    <span className="align-middle font-semibold">Previous Question</span>
                </button>
            )}
            <button
                type="submit"
                value={questionIndex >= questionList.length - 1 ? 'finish' : 'next'}
                className="btn-default btn-page l"
                disabled={!canProceed}
            >
                <span className="font-semibold">
                    {questionIndex >= questionList.length - 1 ? 'Complete' : 'Next Question'}
                </span>
                {questionIndex <= questionList.length - 1 && <ChevronRight className="w-5 h-5 inline align-middle" />}
            </button>
        </>
    ) : (
        <button type="submit" value={isCompleted ? 'submit' : 'start'} className="btn-default font-semibold">
            {isCompleted ? 'Submit Email' : 'Get Started'}
        </button>
    );
}
