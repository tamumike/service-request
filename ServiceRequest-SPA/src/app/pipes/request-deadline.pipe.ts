import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestDeadline'
})
export class RequestDeadlinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const requestDate = new Date(value);
    const today = new Date();
    const sevenDaysOut = today.getTime() + (7 * 24 * 60 * 60 * 1000);
    const requestDateTime = requestDate.getTime();
    let classToReturn = null;

    if (!requestDateTime) {
      return null;
    }

    if (requestDateTime >= today.getTime()) {

      if (requestDateTime <= sevenDaysOut) {

        classToReturn = 'esr-list-alert-yellow';

      } else {

        classToReturn = null;
      }

    } else {

      classToReturn = 'esr-list-alert-red';
    }

    return classToReturn;
  }

}
