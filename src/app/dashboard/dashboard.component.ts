import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/services/account.service';
import { User } from '@app/_models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
user: User;
users = null;

  constructor(private accountService: AccountService) { 
    this.user = this.accountService.userValue;
   }

   ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
}

deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== id));
}

logout() {
  this.accountService.logout();
}
}
