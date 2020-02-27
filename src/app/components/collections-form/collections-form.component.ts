import { Component, OnInit, Input } from '@angular/core';
import { CollectionsService } from "../../services/collections.service";
import { CollectionsFormBase } from "../../models/collections-form-base";
import { CollectionFormService } from "../../services/collection-form.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-collections-form',
  templateUrl: './collections-form.component.html',
  styleUrls: ['./collections-form.component.css']
})
export class CollectionsFormComponent implements OnInit {

  constructor(
    private formService: CollectionFormService,
    private service: CollectionFormService,
    private collectionService: CollectionsService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    let group: any = {};

    //   65: ["", new FormControl('',Validators.required)],
    //   66: ["", new FormControl('',Validators.required)],
    //   67: ["", new FormControl('',Validators.required)]
    // };
    this.anotherFormGroup
    this.formObjects
    this.getInitialCollectionForm();
    this.paymentFormGroup = new FormGroup({});
  }

  data: any[];
  formData;
  value;
  formObjects;
  form: FormGroup;
  paymentForm;
  paymentFormGroup: FormGroup;
  anotherFormGroup: any = {};
  public stage = "initial";

  public collectionForm: CollectionsForm;

  getInitialCollectionForm() {
    this.service.getForm().subscribe(
      form => {
        this.collectionForm = form;
        this.data = form.collectionInputSpecs;
        this.formObjects = form.collectionInputSpecs;
        this.paymentFormGroup = this.toFormGroup(this.data);
      },
      error => { console.log("error") }
    )
  }

  // getCollectionForm(payload) {
  //   this.formObjects = payload.collectionInputSpecs;
  // }

  toFormGroup(collectionInput) {
    let group: any = {};

    collectionInput.forEach(element => {
      group[element.key] = element.inputType != "label" ? new FormControl(element.inputValue || '', this.mapValidators(element)) : 
                                                          new FormControl({value: element.inputValue || '', disabled: true});
      //group[element.key] = new FormControl('', this.mapValidators(element));
    });

    return new FormGroup(group);
  }

  private mapValidators(formdata) {
    const formValidators = [];

    if (formdata.required == true) {
      formValidators.push(Validators.required);
    }

    if (formdata.inputType == "email") {
      formValidators.push(Validators.email);
    }

    if (formdata.labelName.indexOf("email") >= 0 || formdata.labelName.indexOf("Email") >= 0) {
      formValidators.push(Validators.email);
    }

    if (formdata.labelName.indexOf("account") >= 0 || formdata.labelName.indexOf("Account") >= 0) {
      formValidators.push(Validators.pattern('[0-9]+'));
    }
    

    return formValidators;
  }

  getErrorMessages(inputField){
      var errorMessage = [];
      if(this.paymentFormGroup.get((inputField.key).toString()).errors.required){
        errorMessage.push(inputField.labelName + " is required.");
      }
      return errorMessage;
    
  }

  getFormGroup(objectProps: any[]) {
    let group: any = {};

    objectProps.forEach(prop => {
      group[prop.key] = prop.required ? new FormControl(prop.inputValue || '', Validators.required) : new FormControl(prop.inputValue || '');
    });

    return new FormGroup(group);

  }

  ngOnInit() {
    var response = this.getInitialCollectionForm();
    
    const formGroup = {};
  }



  onSubmit(form, flowId) {
    
    console.log(form);
    console.log(form.valid);
    //var flowId = this.formObjects.flowId;

    var formData = {
      FlowId: flowId,
      FlowForm:[form.value]
    }
    this.snackbar.open("Sending data","Close",{duration: 5000});
    this.service.getCategoryItemForm(formData)
                .subscribe(
                  form => {
                    this.collectionForm = form;
                    this.data = form.collectionInputSpecs;
                    this.formObjects = form.collectionInputSpecs;
                    this.paymentFormGroup = this.toFormGroup(this.data);
                  },
                  error => { console.log("error") }
                )
    ;
    console.log(this.collectionForm);
    this.snackbar.dismiss();
    
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