export class BusinessError extends Error {
  readonly descriptionCode: string;

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
}
