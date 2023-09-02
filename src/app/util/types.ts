import { ListClasses } from './enums/list-classes';
import { ListTags } from './enums/list-tags';
import { ListTextContent } from './enums/list-textContent';

export interface ISource {
  tag: ListTags;
  classNames?: ListClasses | ListClasses[];
  textContent?: ListTextContent | string;
  callback?: (event: Event) => void;
}

export interface DataBreed {
  name: string;
  id: string;
}
