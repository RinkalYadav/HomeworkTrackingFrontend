import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HomeworkTracking';
}
