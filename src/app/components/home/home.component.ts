import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CollectionsService } from "../../services/collections.service";
import { CategoryComponent } from "../category/category.component";
import { CategoryItemsComponent } from "../category-items/category-items.component";
import { CollectionFlowsComponent } from "../collection-flows/collection-flows.component";
import { CollectionsFormComponent } from "../collections-form/collections-form.component";
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { QuestionService } from "../../services/question.service";
import { MatSnackBar, MatStepper } from '@angular/material';
import { FlutterwaveComponent } from "../flutterwave/flutterwave.component";
import { Observable } from "rxjs";
import { group } from '@angular/animations';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QuestionService]
})
export class HomeComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  public categories: Collections[];

  public list: any[];

  public filteredCollections: Observable<any[]>;

  public collectionsSearchForm: FormControl;

  public showNext: boolean = false;

  public IbranchAppState = {
    isCategorySelected: false,
    isCategoryItemSelected: false
  };

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder, 
    questionService: QuestionService, 
    private collectionService: CollectionsService, 
    private snackbar: MatSnackBar
    
  ) {
    this.questions = questionService.getQuestions();
    this.setInitialAppState(this.IbranchAppState);
    this.collectionsSearchForm = new FormControl();
  }

  setInitialAppState(IbranchAppState) {
    var setState = sessionStorage.setItem("Ibranch_Collections_App_State", JSON.stringify(IbranchAppState));
  }

  getCurrentAppState(key: string) {
    var currentAppState = JSON.parse(sessionStorage.getItem("Ibranch_Collections_App_State"));
    return currentAppState[key];
  }

  emptyCategory() {
    var emptyData = sessionStorage.removeItem("Ibranch_Collections_category");
    var IbranchAppState = { isCategorySelected: false };
    var setState = sessionStorage.setItem("Ibranch_Collections_App_State", JSON.stringify(IbranchAppState));
  }

  @ViewChild(CategoryItemsComponent) categoryItems: CategoryItemsComponent;

  onSelectedCategory(category) {
    // console.log(category);
    //   this.categoryItems["category"] = category;
  }

  onSelectedCategoryItem(categoryItem) {

  }

  questions: any[];



  goForward(stepper: MatStepper) {
    stepper.next();
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  ngOnInit() {
    this.IbranchAppState = {
      isCategorySelected: false,
      isCategoryItemSelected: false
    };
    this.setInitialAppState(this.IbranchAppState);
    this.getCategories();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

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

  flattenCollection() {
    this.list = _.flatMap(this.categories, item =>
      _.map(item.collections, collection => _.defaults({ id: item.collections.id, category: item.name }, collection))
    );
  }

  filterCollectionData() {
    this.filteredCollections = this.collectionsSearchForm.valueChanges
      .pipe(
        startWith(''),
        map(collection => collection.length >= 1 ? this.filterCollections(collection) : [])
        
      )
  }

  filterCollections(name: string) {
    return this.list.filter(collection =>
      collection.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selectionChange(val) {
    
    if (this.collectionsSearchForm.valueChanges) {
      if (this.collectionsSearchForm.value) {
        this.showNext = true;
      } else if (!this.collectionsSearchForm.value) {
        this.showNext = false;
      }
    }
    //this.myStepper.selectionChange.emit();
    this.myStepper._steps.last;
    //this.goForward();
    //this.stepper.selectedIndex = 2;
    console.log(val);
  }


  private handleError(error) {
    this.snackbar.open(error, "close", { duration: 5000 });
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