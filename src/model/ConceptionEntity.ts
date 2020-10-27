import { Conception } from 'types';
import { v4 as uuid } from 'uuid';

export class ConceptionEntity implements Conception {
  id = uuid();

  title: string;

  description = '';

  created: number = Date.now();

  probability = 0;

  constructor(title: string, description = '') {
    this.title = title;
    this.description = description;
  }
}
