import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from "./app.material";
import { AppRoutingModule } from "./app.routing";
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AngularRaveModule } from "angular-rave";
import { RavepaymentModule } from "angular4-ravepayment";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { CollectionsService } from './services/collections.service';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { CollectionFlowsComponent } from './components/collection-flows/collection-flows.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './services/question-control.service';
import { QuestionService } from './services/question.service';
import { VerificationComponent } from './components/verification/verification.component';
import { CollectionFormService } from './services/collection-form.service';
import { CollectionsFormComponent } from './components/collections-form/collections-form.component';
import { CollectionsFormInputComponent } from './components/collections-form-input/collections-form-input.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CollectionFlowsFormService } from './services/collection-flows-form.service';
import { ObjectToArrayPipe } from './pipes/object-to-array.pipe';
import { FlutterwaveComponent } from './components/flutterwave/flutterwave.component';
import { ScriptStoreService } from './services/script-store.service';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    CategoryItemsComponent,
    CollectionFlowsComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    VerificationComponent,
    CollectionsFormComponent,
    CollectionsFormInputComponent,
    JumbotronComponent,
    ObjectToArrayPipe,
    FlutterwaveComponent,
    CategoryDetailsComponent
  ],
  imports: [
    AngularRaveModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RavepaymentModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [CollectionsService, QuestionControlService, QuestionService, CollectionFormService, CollectionFlowsFormService, ScriptStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
