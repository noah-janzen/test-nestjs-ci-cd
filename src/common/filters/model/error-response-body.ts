export interface ErrorResponseBody {
  error: {
    descriptionCode: string;
    message: string;
    path: string;
    timestamp: string;
  };
}
