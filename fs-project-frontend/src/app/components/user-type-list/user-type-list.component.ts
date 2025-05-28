import { Component } from '@angular/core';
import { UserType } from '../../models/user-type.model';
import { UserTypeService } from '../../services/user-type.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-type-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-type-list.component.html',
  styleUrl: './user-type-list.component.css'
})
export class UserTypeListComponent {
  userTypes: UserType[] = [];
  sortColumn: keyof UserType = 'id';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private service: UserTypeService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserTypes();
  }

  loadUserTypes(): void {
    this.service.getAll().subscribe(data => {
      this.userTypes = data;
      this.sortColumn = "id";
      this.sortDirection = 'desc';
      this.sortBy(this.sortColumn); // tri initial
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(() => this.loadUserTypes());
  }

  edit(id: number): void {
    this.router.navigate(['/user-type-form'], { queryParams: { id } });
  }

sortBy(column: keyof UserType): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.userTypes.sort((a, b) => {
    let valueA: any = a[column] ?? '';
    let valueB: any = b[column] ?? '';

    if (typeof valueA === 'string') valueA = valueA.toLowerCase();
    if (typeof valueB === 'string') valueB = valueB.toLowerCase();

    if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}


  getSortIcon(column: keyof UserType): string {
    if (this.sortColumn !== column) return '';
    return this.sortDirection === 'desc' ? '↑' : '↓';
  }
}
