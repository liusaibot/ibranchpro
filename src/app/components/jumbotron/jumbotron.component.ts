import { Component, OnInit } from '@angular/core';
import { CollectionFormService } from "../../services/collection-form.service";
import { CollectionsService } from "../../services/collections.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
//import { ObjectToArrayPipe } from "../../pipes/object-to-array.pipe";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  constructor(
    private service: CollectionFormService, 
    private collectionService: CollectionsService,
    private formBuilder: FormBuilder 
    //private objectToArrayPipe: ObjectToArrayPipe
  ) {

    let group: any = {};
    // this.form = formBuilder.group({

    // });
   }

  data: any[];
  formData;
  value;
  formObjects;
  form: FormGroup;

  collectionForm: CollectionsForm;

  getCollectionForm() {
    this.service.getForm().subscribe(
      form => { 
        this.collectionForm = form;
        this.data = form.collectionInputSpecs;
        this.formObjects = form.collectionInputSpecs;
      },
      error => { console.log("error") }
    )
  }

  getFormGroup(collectionInput){
     let group: any = {};

    collectionInput.forEach(element => {
      group[element.key] = element;
    });

    return group;
  }

  changeValue(){
    return 5;
  }
  

  ngOnInit() {


    this.getCollectionForm();

    const formGroup = {};
    for(let prop of this.formObjects){
      formGroup[prop] = new FormControl('',[Validators.required])
    }

    var info = 5;
    console.log("jumbo service: " + JSON.stringify(this.collectionForm));
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
