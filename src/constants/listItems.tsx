import { TestCards, TestColorButtons, TestParagraph } from 'components/test';
import type { TestListItem } from 'components/test/TestList';

const ITEMS_COUNT = 25;
const numberWithSuffix = (number: number) => {
  const digits = String(number)
    .split('')
    .map((digit) => Number(digit));
  const lastDigit = digits[digits.length - 1];

  return (number < 10 || number > 20) && lastDigit > 0 && lastDigit < 4
    ? lastDigit === 1
      ? number + 'st'
      : lastDigit === 2
      ? number + 'nd'
      : lastDigit === 3 && number + 'rd'
    : number + 'th';
};
const listItems: TestListItem[] = [
  {
    primaryText: 'Test color buttons',
    secondaryText: 'Testing colors, I guess',
    content: <TestColorButtons />,
  },
  {
    primaryText: 'Test cards',
    secondaryText: 'Testing paper elevation',
    content: <TestCards />,
  },
  ...[...Array(ITEMS_COUNT).keys()].map((index) => ({
    primaryText: `List Item ${index + 1}`,
    secondaryText: `I am the ${numberWithSuffix(index + 1)} item!`,
    content: <TestParagraph />,
  })),
];

export default listItems;