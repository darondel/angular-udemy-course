import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number, completeWords = false, ellipsis = '...'): string {
    let result = value;

    if (value && value.length > limit) {
      if (completeWords) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }

      result = value.substr(0, limit) + ellipsis;
    }

    return result;
  }

}
