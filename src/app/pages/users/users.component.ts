import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: User[];
  displayedColumns: string[] = ['imagePath', 'name', 'email', 'role'];

  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => {
      this.users = response;
    })
  }


}
