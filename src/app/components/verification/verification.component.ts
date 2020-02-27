import { Component, OnInit } from '@angular/core';
import { CollectionsService } from "../../services/collections.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  public categories: Collections[];
  

  constructor(private collectionService: CollectionsService, private snackbar: MatSnackBar) { }



  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.collectionService.getAllCollections()
      .subscribe(categories => {
        this.categories = categories;
        sessionStorage.setItem("storeFront_collections", JSON.stringify(categories));      
      },
        error => {
          this.handleError("Unable to Retrieve Form");
        }
      )
      
      // for(let i = 0; i < this.categories.length; i++){
      //   this.list.push(this.categories[i]);
      // }
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
