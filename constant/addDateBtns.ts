import { addDay, addMonth, addWeek, addYear } from '../util';

export const addDateBtns = [
  { label: '하루', func: addDay, btnColor: 'yellow' },
  { label: '일주일', func: addWeek, btnColor: 'teal' },
  { label: '한달', func: addMonth, btnColor: 'red' },
  { label: '일년', func: addYear, btnColor: 'indigo' },
];
