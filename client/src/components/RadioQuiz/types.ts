import { mockData as DATA } from '@client/assets/mockData';

export type QuestionT = typeof DATA[0];
export type AnswerT = { answer: string; score: number };
export type RadioCheckedT = {
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
};
export type StateT = {
    questionList: QuestionT[];
    questionIndex: number | null;
    answerHistory: Array<number>;
    canProceed: boolean;
    isChecked: RadioCheckedT;
    isCompleted: boolean;
    finalScore: number;
};
