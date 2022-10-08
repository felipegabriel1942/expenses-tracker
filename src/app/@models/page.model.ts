export class PageModel<T> {
  totalOfElements: number;
  page: number;
  totalOfPages;
  content: T[];
  isLastPage: boolean;
}
