import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requestDateValidator(control: AbstractControl) {
  const controlDate = new Date(control.value);
  const now = new Date();
  if (controlDate < now) {
    return { validRequestDate: true };
  }
  return null;
}
