import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import {
  PaginationRequest,
  paginationRequestSchema,
} from './pagination-request';

const PaginationParams = createParamDecorator(function (
  data: unknown,
  ctx: ExecutionContext,
): PaginationRequest {
  const request: Request = ctx.switchToHttp().getRequest();

  return paginationRequestSchema.parse(request.query);
});

export { PaginationParams };
