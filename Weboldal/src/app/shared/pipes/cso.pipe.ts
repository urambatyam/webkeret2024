import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cso',
})
export class CsoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    const date = new Date(value);
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

}
