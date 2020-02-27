import { Component, OnInit, Input } from '@angular/core';
import { CollectionsService } from "../../services/collections.service";
import { CollectionsFormBase } from "../../models/collections-form-base";
import { CollectionFormService } from "../../services/collection-form.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-collections-form',
  templateUrl: './collections-form.component.html',
  styleUrls: ['./collections-form.component.css']
})
export class CollectionsFormComponent implements OnInit {

  @Input() formInputs: CollectionsFormBase<any>[] = [];
  @Input() dataObject;
  @Input() count: number;

  public form: FormGroup;
  public formObjects;

  collectionForm: CollectionsForm;

  objectProps;// = [];
  payLoad = '';
  
  

  constructor(
    private formService: CollectionFormService,
    private service: CollectionFormService, 
    private collectionService: CollectionsService,
    private formBuilder: FormBuilder 
  ) {
    let group: any = {};
   }

  getCollectionForm(payload) {
    this.formObjects = payload.collectionInputSpecs;
  }

  toFormGroup(objectProps: any[]){
    let group: any = {};

    objectProps.forEach(prop => {
      group[prop.key] = prop.required ? new FormControl('',Validators.required) : new FormControl('');
    });

    return new FormGroup(group);

  }

  ngOnInit() {
    //this.form = this.toFormGroup(this.dataObject);
    //this.form = this.formService.toFormGroup(this.formInputs);
    this.objectProps = this.dataObject;
    this.getCollectionForm(this.dataObject);

    const formGroup = {};
    for(let prop of this.formObjects){
      formGroup[prop] = new FormControl('',[Validators.required])
    }

  }

  private mapValidators(validators) {
    const formValidators = [];

    if(validators) {
      for(const validation of Object.keys(validators)) {
        if(validation === 'required') {
          formValidators.push(Validators.required);
        } else if(validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  onSubmit(form) {
    console.log(form);
  }
}

interface CollectionsForm {
  flowId: number,
  isFlowIdDerived: boolean,
  description: string,
  collectionInputSpecs: any[]
}

export class CollectionFormModel {
  key: number;
  labelName: string;
  inputType: string;
  listItems: any[];
  required: boolean;
  visible: boolean;
  inputValue: string;
  isListData: boolean;
  isTextData: boolean;
  isTextAreaData: boolean;
  isLabelData: boolean;
}