import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const cpassword = control.get('cpassword').value;

    return cpassword !== password ? { notMatching: true } : null;
};
