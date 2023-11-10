import { DateFormat } from '../@enums/date-format.enum';

export class DateUtil {
  static formatDate(date: Date, format: DateFormat) {
    if (format == DateFormat.YYYY_MM) {
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }
  }
}
