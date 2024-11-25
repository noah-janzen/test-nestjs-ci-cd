const validateNumber: (value: unknown) => asserts value is number = function (
  value: unknown,
): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected value to be a number');
  }
};

export { validateNumber };
