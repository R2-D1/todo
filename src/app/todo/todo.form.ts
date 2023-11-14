import {FormControl} from "@angular/forms";

export interface TodoForm {
  name: FormControl<null | string>;
  priority: FormControl<null | string>;
}

export interface TodoFormData {
  name: string;
  priority: string;
}
