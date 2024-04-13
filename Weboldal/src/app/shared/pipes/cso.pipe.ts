import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cso',
})
export class CsoPipe implements PipeTransform {

  transform(value: Date | any, ...args: unknown[]): string {
    let date: Date;

    if (value instanceof Date) {
      date = value;
    } else if (value && value.seconds) {
      date = new Date(value.seconds * 1000 + (value.nanoseconds / 1000000));
    } else {
      return '';
    }

    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
   
    return `${year}.${month}.${day}`;
  }

}
