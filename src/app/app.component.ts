import { Component } from '@angular/core';
import { JumbotronComponent } from "./components/jumbotron/jumbotron.component";
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
