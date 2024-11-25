export class BaseError extends Error {
  descriptionCode: string;

  constructor({
    message,
    descriptionCode,
  }: {
    message: string;
    descriptionCode: string;
  }) {
    super(message);
    this.descriptionCode = descriptionCode;
  }

  getDetails(): Record<string, unknown> | undefined {
    return undefined;
  }
}
