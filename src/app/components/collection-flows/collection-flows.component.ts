import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CollectionFormService } from "../../services/collection-form.service";
import { CollectionsService } from "../../services/collections.service";
import { CollectionsFormComponent } from "../collections-form/collections-form.component";

@Component({
  selector: 'app-collection-flows',
  templateUrl: './collection-flows.component.html',
  styleUrls: ['./collection-flows.component.css']
})
export class CollectionFlowsComponent implements OnInit {

  form;
  data;
  info = "info";
  counter = 5;
  formObjects;

  constructor(
    private formBuilder: FormBuilder, 
    private collectionService: CollectionsService,
    private service: CollectionFormService
  ) {
    this.form = formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      Email: ["", [Validators.required,Validators.email]],
      CustomerId: ["", Validators.required],
      Amount: ["", [Validators.required]]
    });
    //this.data = this.collectionService.getCollectionFormDataResponse();
   }

  getCollectionFlowForm(){
    this.service.getForm().subscribe(
      form => {

      }
    )
  }

  getCollectionForm(){
    var response = this.collectionService.getCollectionForm();
    this.data = this.collectionService.collectionForm;
    
  }

  getCollectionFormData(){
    
    this.data = this.collectionService.getCollectionFormData();
    
  }



  ngOnInit() {
    this.getCollectionForm();
    this.data = this.collectionService.getCollectionFormDataResponse();
    console.log("data var is:" + this.data);
    //this.data = this.collectionService.collectionForm;
    
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
