import React from 'react';
import { WeekAheadLayout } from '../components/TarotPageComponents/WeekAheadLayout';
import { CelticCrossLayout } from '../components/TarotPageComponents/CelticCrossLayout';
import { RelationshipLayout } from '../components/TarotPageComponents/RelationshipLayout';

export const CELTIC_CROSS_LEGEND = [
    'Question / Situation',
    'What crosses you',
    'Best of Circumstances',
    'Foundation / Reason for reading',
    'The Past',
    'The Near Future',
    'You',
    'Environment',
    'Hopes or Fears',
    'The Outcome',
];

export const WEEK_AHEAD_LEGEND = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Significator',
];

export const RELATIONSHIP_LEGEND = [
    'Distant past influences',
    'Recent past influences',
    'Current state of the relationship',
    'Future influences',
    'External influences',
    'Beliefs',
    'Favorable energy',
    'Whats working against',
    'Hopes and or fears',
    'Outcome for the relationship',
];

export type LayoutPageDataType = {
    layoutName: string;
    layoutComponent: JSX.Element;
    layoutLegend: Array<string>;
};

export const LAYOUT_PAGE_DATA: LayoutPageDataType[] = [
    {
        layoutName: 'Celtic Cross',
        layoutComponent: <CelticCrossLayout />,
        layoutLegend: CELTIC_CROSS_LEGEND,
    },
    {
        layoutName: 'Week Ahead',
        layoutComponent: <WeekAheadLayout />,
        layoutLegend: WEEK_AHEAD_LEGEND,
    },
    {
        layoutName: 'Relationship',
        layoutComponent: <RelationshipLayout />,
        layoutLegend: RELATIONSHIP_LEGEND,
    },
];
