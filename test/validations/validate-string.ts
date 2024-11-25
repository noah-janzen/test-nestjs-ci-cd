const validateString: (value: unknown) => asserts value is string = function (
  value: unknown,
): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected value to be a string');
  }
};

export { validateString };
