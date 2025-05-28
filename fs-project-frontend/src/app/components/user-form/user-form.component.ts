import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { customValidators } from '../../validators/customValidators';
import { UserType } from '../../models/user-type.model';
import { UserTypeService } from '../../services/user-type.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent { 
  form: FormGroup;
  isEditMode: boolean = false;
  id: number | null = null;
  userTypes: UserType[] = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, customValidators.notOnlyWhitespace]],
      lastName:['', [Validators.required, customValidators.notOnlyWhitespace]],
      email:['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userType:[null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userTypeService.getAll().subscribe(data => {
      this.userTypes = data;
    });

    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ? +params['id'] : null;
      this.isEditMode = this.id !== null;

      if (this.isEditMode) {
        this.userService.getAll().subscribe(users => {
          const match = users.find(t => t.id === this.id);
          if (match) {
            const selectedType = this.userTypes.find(t => t.id === match.userType.id);
            this.form.patchValue({ 
              lastName: match.lastName,
              firstName: match.firstName,
              email: match.email,
              userType: selectedType
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      const user: User = 
      { 
        lastName: this.form.value.lastName, 
        firstName: this.form.value.firstName, 
        email: this.form.value.email,
        userType: this.form.value.userType
      };

      if (this.id !== null) {
        this.userService.update(this.id, user).subscribe(() => {
          console.log('Updated successfully');
          this.router.navigate(['/user-list']);
        });
      } else {
        this.userService.create(user).subscribe(() => {
          console.log('Created successfully');
          this.router.navigate(['/user-list']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get userType() {
    return this.form.get('userType');
  }

}
