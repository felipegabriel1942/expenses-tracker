import { ButtonColorEnum } from './../enums/button-color.enum';

export class ButtonInterface {
  id: string | number;
  text: string;
  color?: ButtonColorEnum;
  isLoading?: boolean;
}
