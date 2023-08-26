import {
  Operator,
  controlDay,
  controlMonth,
  controlWeek,
  controlYear,
} from '../util';

export interface ControlDateBtnType {
  label: '하루' | '일주일' | '한달' | '일년';
  calculateDate: (operator: Operator, date: Date) => Date;
  btnColor: 'amber' | 'teal' | 'red' | 'indigo';
}

export const ControlDateBtns: ControlDateBtnType[] = [
  {
    label: '하루',
    calculateDate: controlDay,
    btnColor: 'amber',
  },
  {
    label: '일주일',
    calculateDate: controlWeek,
    btnColor: 'teal',
  },
  {
    label: '한달',
    calculateDate: controlMonth,
    btnColor: 'red',
  },
  {
    label: '일년',
    calculateDate: controlYear,
    btnColor: 'indigo',
  },
];
