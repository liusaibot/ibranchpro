import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CollectionsService } from "../../services/collections.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

public categoryDetail;

  constructor(private route: ActivatedRoute, private service: CollectionsService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){
    var categoryName = this.route.snapshot.params["name"];
    this.categoryDetail = this.service.getCategory(categoryName);
    console.log("---categories---");
    console.log(this.categoryDetail);
  }

}
