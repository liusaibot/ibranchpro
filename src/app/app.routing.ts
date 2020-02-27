import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { VerificationComponent } from "./components/verification/verification.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";
//import { ShowingComponent } from "./components/showing/showing.component";
// import { ListMessagesComponent } from "./components/message/list-messages/list-messages.component";
// import { RegisterComponent } from './components/users/register/register.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'verification', component: VerificationComponent},
    { path: 'category/:name', component: CategoryDetailsComponent}
    //{ path: 'showings', component: ShowingComponent},
    // { path: 'messages', component: ListMessagesComponent },
    // { path: 'messages/:name', component: ListMessagesComponent },
    // { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }