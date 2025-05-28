import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: User[] = [];
  sortColumn: keyof User = 'userType';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserTypes();
  }

  loadUserTypes(): void {
    this.service.getAll().subscribe(data => {
      this.users = data;
      this.sortColumn = 'userType';
      this.sortDirection = 'desc';
      this.sortBy(this.sortColumn); // tri initial
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(() => this.loadUserTypes());
  }

  edit(id: number): void {
    this.router.navigate(['/user-form'], { queryParams: { id } });
  }

  sortBy(column: keyof User): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.users.sort((a, b) => {
        let valueA: any = a[column];
        let valueB: any = b[column];

        if (column === 'userType') {
          valueA = a.userType?.typeName?.toLowerCase() ?? '';
          valueB = b.userType?.typeName?.toLowerCase() ?? '';
        } else {

          if (typeof valueA === 'string') valueA = valueA.toLowerCase();
          if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

  
    getSortIcon(column: keyof User): string {
      if (this.sortColumn !== column) return '';
      return this.sortDirection === 'desc' ? '↑' : '↓';
    }
}
