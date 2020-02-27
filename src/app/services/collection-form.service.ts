import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Subject } from "rxjs/Rx";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CollectionsFormBase } from "../models/collections-form-base";

@Injectable()
export class CollectionFormService {

  BASE_URL = "./assets/data/";

  public collectionsForm: CollectionsForm[];

  constructor(private http:Http, private snackbar: MatSnackBar) { 
    this.getForm();
  }

  getForm(): Observable<CollectionsForm>{
    return this.http.get(this.BASE_URL + "form1.json")
                    .map(response => response.json())
                    .map(item => item as CollectionsForm);
  }

  getCategoryItemForm(flowRequest){
    console.log("old form" +flowRequest);
    return this.http.get(this.BASE_URL + "form.json")
                    .map(response => response.json())
                    .map(item => item as CollectionsForm);
  }

  getCollectionsForm(){
    var data;
    var response = this.http.get(this.BASE_URL + "form1.json")
                          .subscribe(response => 
                            {
                              this.collectionsForm = response.json();
                              //this.collectionsForm.push(Object.assign({}, response.json()));
                              console.log("collections Form" +this.collectionsForm);
                            },
                            error =>{
                              this.handleError("Unable to Retrieve Form");
                            }
                          );
  }

  toFormGroup(formItems){
    let group: any = {};

    formItems.forEach(element => {
      group[element.key] = new FormControl('', Validators.required)
    });

    return new FormGroup(group);
  }

  private handleError(error) {
    
    this.snackbar.open(error, "close", { duration: 5000 })
}

}

interface CollectionsForm {
  flowId: number,
  isFlowIdDerived: boolean,
  description: string,
  collectionInputSpecs: any[]
}

  // toFormGroup(formInputs: CollectionsFormBase<any>[]){
  //   let group: any = {};

  //   formInputs.forEach(formInput => {
  //     group[formInput.key] = formInput.required ? new FormControl(formInput.value || '', Validators.required) :
  //                                                 new FormControl(formInput.value || '')
  //   });
  //   return new FormGroup(group);
  // }