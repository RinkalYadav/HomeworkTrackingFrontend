import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { TeacherpageComponent } from "./teacherpage/teacherpage.component";
import { StudentpageComponent } from "./studentpage/studentpage.component";
import { HomeworkdetailsComponent } from "./homeworkdetails/homeworkdetails.component";
import { SubmithomeworkComponent } from "./submithomework/submithomework.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent, TeacherpageComponent, StudentpageComponent, HomeworkdetailsComponent, SubmithomeworkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HomeworkTracking';
}
