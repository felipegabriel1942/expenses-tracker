import { SnackbarType } from '../enums/snackbar-type.enum';

export interface SnackbarInterface {
  message: string;
  type: SnackbarType;
  isShowing?: boolean;
  duration?: number;
}
