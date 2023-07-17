import { OperationType } from '../@enums/operation-type.enum';

export class Operation<T> {
  operationType: OperationType;
  content: T;
}
