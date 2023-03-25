export function renderHeadingText(questionText: string, qIndex: number | null, completed: boolean): string {
    if (qIndex !== null && qIndex >= 0 && !completed) return questionText;
    else if (completed) return 'Final Results';
    else return 'Start intro prompting';
}
