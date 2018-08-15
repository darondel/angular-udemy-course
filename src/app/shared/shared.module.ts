import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { DropdownDirective } from "./dropdown.directive";
import { ImageValidator } from "./image-validator.directive";
import { TruncatePipe } from "./truncate.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DropdownDirective,
    ImageValidator,
    TruncatePipe
  ],
  exports: [
    DropdownDirective,
    ImageValidator,
    TruncatePipe
  ]
})
export class SharedModule {
}
