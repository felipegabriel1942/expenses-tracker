export class DateUtils {
  static convertStringToDate(value: string): Date {
    if (value.length < 8) {
      return null;
    }

    let day, month, year;

    if (value.includes('/')) {
      day = value.substring(0, 2);
      month = value.substring(3, 5);
      year = value.substring(6, 10);
    } else if (!value.includes('/') && value.length === 8) {
      day = value.substring(0, 2);
      month = value.substring(2, 4);
      year = value.substring(4, 8);
    }

    return new Date(+year, +month - 1, +day);
  }

  static convertDateToString(value: Date): string {
    if (value == null) {
      return;
    }

    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();

    const month =
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : value.getMonth() + 1;

    return `${day}/${month}/${value.getFullYear()}`;
  }
}
