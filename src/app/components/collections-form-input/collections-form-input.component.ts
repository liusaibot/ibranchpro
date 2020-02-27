import { Component, OnInit, Input } from '@angular/core';
import { CollectionFormService } from "../../services/collection-form.service";
import { CollectionsService } from "../../services/collections.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { CollectionsFormBase } from "../../models/collections-form-base";

@Component({
  selector: 'app-collections-form-input',
  templateUrl: './collections-form-input.component.html',
  styleUrls: ['./collections-form-input.component.css']
})
export class CollectionsFormInputComponent implements OnInit {

  @Input() formInput: CollectionsFormBase<any>;
  @Input() form: FormGroup;

  get isValid(){ return this.form.controls[this.formInput.key].valid;}
  constructor() { }

  ngOnInit() {
  }

}
