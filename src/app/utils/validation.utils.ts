import { ValidationErrors } from '@angular/forms';

export class ValidationUtils {
  static getErrorMessage(errors?: ValidationErrors): string {
    console.log(errors);
    if (errors == null) {
      return;
    }

    // TODO: refatorar objeto para um enum
    const errorMessages = {
      required: 'Campo obrigátorio.'
    };

    return errorMessages[Object.keys(errors)[0]];
  }
}
