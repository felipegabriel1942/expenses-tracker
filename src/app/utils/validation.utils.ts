import { ValidationErrors } from '@angular/forms';

export class ValidationUtils {
  static getErrorMessage(errors?: ValidationErrors): string {
    if (errors == null) {
      return;
    }

    // TODO: refatorar objeto para um enum
    const errorMessages = {
      required: 'Campo obrigátorio.',
      invalidDate: 'Data inválida',
    };

    return errorMessages[Object.keys(errors)[0]];
  }
}
