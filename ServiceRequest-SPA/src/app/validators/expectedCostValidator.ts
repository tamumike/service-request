import { AbstractControl } from '@angular/forms';

export function expectedCostValidator(control: AbstractControl) {
  const val = control.value;

  if (val > 0 && val <= 25000.00) {
    return null;
  } else {
    return { invalidExpectedCost: true };
  }
}
