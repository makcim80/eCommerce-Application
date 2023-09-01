import { ListClasses } from './enums/list-classes';
import { ListTags } from './enums/list-tags';

export interface ISource {
  tag: ListTags;
  classNames?: ListClasses | ListClasses[];
  textContent?: string;
  callback?: (event: Event) => void;
}

export interface DataBreed {
  name: string;
  id: string;
}
