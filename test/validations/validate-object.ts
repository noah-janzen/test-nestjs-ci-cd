const validateObject: (
  value: unknown,
) => asserts value is Record<string, unknown> = function (
  value: unknown,
): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Expected value to be an object');
  }
};

export { validateObject };
