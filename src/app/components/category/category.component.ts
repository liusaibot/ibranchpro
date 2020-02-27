import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CollectionsService } from "../../services/collections.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { group } from '@angular/animations';
import { MatSnackBar } from "@angular/material";
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";
// import { CategoryItemsComponent } from "../category-items/category-items.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Output() onSelectedCategory = new EventEmitter();

  public categories: Collections[];

  public selectedCategory: Collections;

  public collectionOptions: Observable<Collections[]>;

  public IbranchAppState;

  public list: any[];

  filteredCollections: Observable<any[]>;

  public collectionsSearchForm: FormControl;

  public showNext: boolean = false;
  

  constructor(private collectionService: CollectionsService, private formBuilder: FormBuilder, private snackbar: MatSnackBar) { 
    this.collectionsSearchForm = new FormControl();
    
  }

  ngOnInit() {
    this.IbranchAppState = JSON.parse(sessionStorage.getItem("Ibranch_Collections_App_State"));
    sessionStorage.setItem("Ibranch_Collections_isSelected", "false");
    //var response = this.collectionService.getCollections();
    
    this.getCategories();

    

    

    // this.collectionOptions = this.categoryCollectionsForm.get('categories')!.valueChanges
    //                                                       .pipe(
    //                                                           startWith(''),
    //                                                           map(val => this.filterGroup(val))
    //                                                       );
  }

  getCategories(): void {
    this.collectionService.getAllCollections()
      .subscribe(categories => {
        this.categories = categories;
        this.flattenCollection();
        this.filterCollectionData();
      },
        error => {
          this.handleError("Unable to Retrieve Form");
        }
      )
      
      // for(let i = 0; i < this.categories.length; i++){
      //   this.list.push(this.categories[i]);
      // }
  }

  flattenCollection(){
    this.list = _.flatMap(this.categories, item =>
    _.map(item.collections, collection => _.defaults({id : item.collections.id, category : item.name}, collection))
    );
  }

  filterCollectionData(){
    this.filteredCollections = this.collectionsSearchForm.valueChanges
                                                        .pipe(
                                                          startWith(''),
                                                          map(collection => collection.length >= 1 ? this.filterCollections(collection) : [])
                                                          //map(collection => collection.length >= 1 ? this.filterCollections(collection) : this.list.slice())
                                                        )
  }
  onSelect(collections: Collections): void {
    this.selectedCategory = collections;
  }

  selectionChange(val){
    
    if(this.collectionsSearchForm.valueChanges){
      if(this.collectionsSearchForm.value){
        this.showNext = true;
      } else if(!this.collectionsSearchForm.value) {
        this.showNext = false;
      }
    }
    
    // return form => {
    //   if(form.controls[].value)
    // }
    // console.log(val);
  }

  StoreCategory(category) {
    var data = JSON.stringify(category);
    sessionStorage.setItem("Ibranch_Collections_category", data);

    var AppState = JSON.parse(sessionStorage.getItem("Ibranch_Collections_App_State"));
    AppState.isCategorySelected = true;

    sessionStorage.setItem("Ibranch_Collections_App_State", JSON.stringify(AppState));
    sessionStorage.setItem("Ibranch_Collections_isSelected", "true");

    this.onSelectedCategory.emit(category);
  }

  //stateGroupOptions: Observable<[]>;
  filterGroup(val: string): any[] {
    if (val) {
      // var collection = {
      //   name: this._filter(collection[name], val)
      // }
      return this.list
        .map(group => ({
                category: group.category,
                name: this._filter(group.name, val)
                
              }))
        .filter(group => group.name.length > 0);
    }
    return this.list;
  }

  private _filter(opt: string[], val: string) {
    const filterValue = val.toLowerCase();
    return opt.filter(item => item.toLowerCase().startsWith(filterValue));
  }

  filterCollections(name: string){
    return this.list.filter(collection => 
                  collection.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  private handleError(error) {
    
    this.snackbar.open(error, "close", { duration: 5000 })
}

}

interface Collections {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  base64Image: string,
  collections: any[]
}
