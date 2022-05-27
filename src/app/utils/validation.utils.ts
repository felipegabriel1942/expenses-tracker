import { ValidationErrors } from '@angular/forms';

export class ValidationUtils {
  static getErrorMessage(errors?: ValidationErrors): string {
    if (errors == null) {
      return;
    }

    // TODO: refatorar objeto para um enum
    const errorMessages = {
      require: 'Campo obrigátorio.'
    };

    return errorMessages[Object.keys(errors)[0]];
  }
}
