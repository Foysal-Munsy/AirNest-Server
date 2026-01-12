// src/common/utils/validation-error.formatter.ts
import { ValidationError } from 'class-validator';

export function formatValidationError(errors: ValidationError[]): string {
  for (const error of errors) {
    if (error.constraints) {
      return Object.values(error.constraints)[0];
    }

    if (error.children && error.children.length > 0) {
      return formatValidationError(error.children);
    }
  }

  return 'Validation failed';
}
