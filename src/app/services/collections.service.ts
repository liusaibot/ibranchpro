import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Subject } from "rxjs/Rx";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CollectionsService {

  //BASE_URL = "./assets/data/collections.json";
  BASE_URL = "./assets/data/";
  categories: Collections[];
  public collectionCategory: Collections[];

  collectionForm = [];
  collectForm = [];
  public collectionFromResponse: CollectionsForm;
  private collectionFormSubject = new Subject();

  constructor(private http:Http, private snackbar: MatSnackBar) { 
    this.getCollections();
    this.getCollectionForm();
  }

getAllCollections(): Observable<Collections[]>{
  return this.http.get(this.BASE_URL + "collections.json")
                  .map(response => response.json())
                  .map(item => item as Collections[]);
}

getCategory(categoryName: string){
  let categoriesJSON;
  let categories = [];
  let category;
//   if(sessionStorage.getItem("storeFront_collections") === undefined){
// console.log("Found in Storage");
//   }
  if(sessionStorage.getItem("storeFront_collections") === null || sessionStorage.getItem("storeFront_collections") === undefined){
    var result = this.getAllCollections()
                      .toPromise()
                      .then((response) => {
                        //categories.push(response);
                        //let allCategory = [];
                        sessionStorage.setItem("storeFront_collections",JSON.stringify(response));
                        // let data = response;
                        // data.forEach((entry)=>{
                        //   categories.push(entry);
                        // })
                      })
    // console.log("---No Storage---");
    // console.log(categories);
    // category = categories.filter(object => { return object.name == categoryName})
                    // .subscribe(
                    //   response => {
                    //     categories = response as Collections[];
                    //     category = categories.filter(object => { return object.name == categoryName});
                    //     // console.log(category);
                    //   }
                    // );
    
    
  }
  // else{
    categoriesJSON = sessionStorage.getItem("storeFront_collections");
    categories = JSON.parse(categoriesJSON) as Collections[];
    console.log("---Yes Storage---");
    console.log(categories);
    category = categories.filter(object => { return object.name == categoryName})
  //}
  return category as Collections;
}

getCollections() {
    var response = this.http.get(this.BASE_URL + "collections.json")
                          .subscribe(response => 
                            {
                              this.categories = response.json();
                              // var data = JSON.stringify(this.categories);
                              // localStorage.setItem("Ibranch_Collections_category",data);
                            },
                            error =>{
                              this.handleError("Unable to Retrieve Collections");
                            }
                          );
                          
  }

  getCollectionForm(){
    var response = this.http.get(this.BASE_URL + "form1.json")
                          .subscribe(response => 
                            {
                              this.collectionForm = response.json();
                              this.collectionFormSubject.next(this.collectionForm);
                              //console.log(this.collectionForm);
                              // var data = JSON.stringify(this.categories);
                              // localStorage.setItem("Ibranch_Collections_category",data);
                            },
                            error =>{
                              this.handleError("Unable to Retrieve Form");
                            }
                          );
  }

  getCollectionFormData(){
    var response = this.http.get(this.BASE_URL + "form1.json")
                          .subscribe(response => 
                            {
                              this.collectionForm = this.collectionForm || [];
                              this.collectionForm = response.json();
                              this.collectionFormSubject.next(this.collectionForm);
                              return this.collectionForm;
                              
                            },
                            error =>{
                              this.handleError("Unable to Retrieve Form");
                            }
                          );
      
  }

  // getCollectionFormDataResponse(){
  //   var data;
  //   var response = this.http.get(this.BASE_URL + "form1.json")
  //                         .subscribe(response => 
  //                           {
  //                             data = JSON.stringify(response.json());
  //                             localStorage.setItem("collectionForm", data);
  //                             console.log("data from service:" + JSON.stringify(data))
  //                             this.collectionFromResponse = response.json() as CollectionsForm;
  //                           },
  //                           error =>{
  //                             this.handleError("Unable to Retrieve Form");
  //                           }
  //                         );
  //                         console.log(data);
  //                         return data;
  //                         //return this.collectionFromResponse;
      
  // }

  getCollectionFormDataResponse(){
    var response = this.http.get(this.BASE_URL + "form1.json")
                          .subscribe(response => 
                            {
                              //this.collectForm = [];
                              this.collectForm = this.collectForm || [];
                              this.collectForm.push(Object.assign({}, response.json()));
                              //this.collectForm = Object.assign({},response.json());
                              this.collectionFormSubject.next(this.collectionForm);
                              
                              
                            },
                            error =>{
                              this.handleError("Unable to Retrieve Form");
                            }
                          );
                          return this.collectForm;
      
  }

  getCollectionFlow(flowForm){
    
    var response = this.http.post(this.BASE_URL + "data.json",flowForm);
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

interface Collections {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  base64Image: string,
  collections: any[]
}