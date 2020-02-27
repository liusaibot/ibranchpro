import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { CollectionFormService } from "../../services/collection-form.service";
import { CollectionsService } from "../../services/collections.service";

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {

  @Output() collectionForm = new EventEmitter();

  constructor(private collectionFormService: CollectionFormService, private collectionsService: CollectionsService) { }

  public category = JSON.parse(sessionStorage.getItem("Ibranch_Collections_category"));
  public dataSource = new MatTableDataSource(this.category.collections);
  
  public loadStatus = false;

  public check = "false";

  public result;
  public collections;

  displayedColumns = ['imageUrl','name','owner','action'];

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  getStatus(){
    if(typeof this.category.collections === "undefined"){
      return false;
    }
    else {
      return true;
    }
  }

  getCategory(){
    var result = JSON.parse(sessionStorage.getItem("Ibranch_Collections_category"));
    this.category = result;
  }

  IsLoaded(){
    this.check = sessionStorage.getItem("Ibranch_Collections_isSelected");
    var result = JSON.parse(sessionStorage.getItem("Ibranch_Collections_category"));
    
    if(this.category == null){
      return this.loadStatus = false;
    }
    else {
      this.dataSource = new MatTableDataSource(this.category.collections);
      return this.loadStatus = true;
    }
  }

  getInitialCollectionForm(content){
    var removePreviousCollection = sessionStorage.removeItem("collection");
    var collection = sessionStorage.setItem("collection",JSON.stringify(content));
    var firstFormId = content.collectionFlows[0].id;
    var firstForm = { flowId: firstFormId};

    var result = this.collectionFormService
                        .getCategoryItemForm(firstForm)
                        .subscribe()
                                            ;
    console.log("result: " + result);
  }

  ngOnInit() {
     
  }

}


