import { BaseError } from './base.error';

export class BusinessError extends BaseError {
  constructor({
    message,
    descriptionCode,
  }: {
    message: string;
    descriptionCode: string;
  }) {
    super({ message, descriptionCode });
  }
}
