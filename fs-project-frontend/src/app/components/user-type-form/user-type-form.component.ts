import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../models/user-type.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-type-form',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './user-type-form.component.html',
  styleUrl: './user-type-form.component.css'
})
export class UserTypeFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userTypeService: UserTypeService
  ) {
    this.form = this.fb.group({
      label: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userType: UserType = { typeName: this.form.value.label };
      this.userTypeService.create(userType).subscribe({
        next: (res) => {
          console.log('Created successfully:', res);
          this.form.reset();
        },
        error: (err) => console.error('Error creating user type', err)
      });
    }
  }
}
