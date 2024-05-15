import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: any
  userId: number | undefined;

  constructor(private userService: UserServiceService, private route: ActivatedRoute,private router: Router,private loaderService:LoaderService) {

  }

  ngOnInit(): void {
    this.loaderService.showLoader('prof')
    this.getUser()
  }

  getUser() {
    this.route.paramMap.subscribe((params: any) => {
      this.userId = +params.get('id');
      this.userService.getUser(this.userId).subscribe(res => {        
        this.user = res.data
      })
      this.loaderService.hideLoader('prof')

    });

  }
  goBack() {
    this.router.navigate(['/users']); // Navigate back to the user list
  }


}
