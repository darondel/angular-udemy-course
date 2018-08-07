import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';

import { Observable } from 'rxjs';

@Directive({
  selector: '[appImageLoadable][formControlName],[appImageLoadable][formControl],[appImageLoadable][ngModel]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: ImageValidator, multi: true}
  ]
})
export class ImageValidator implements AsyncValidator {

  constructor() {
  }

  static loadable(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise(resolve => {
      const imageSrc = control.value;

      if (imageSrc) {
        const image = new Image();

        image.onload = () => resolve(null);
        image.onerror = () => resolve({imageUnloadable: true});
        image.src = imageSrc;
      } else {
        resolve(null);
      }
    });
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return ImageValidator.loadable(control);
  }

}
