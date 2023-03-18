const timeoutFromTransitionString = (transitionStr: string) =>
  transitionStr
    .split(' ')
    .map((part) => Number(part.replace(/m?s/, '')))
    .filter((part) => part)
    .reduce((prev, curr) => prev + curr, 0);

export default timeoutFromTransitionString;
