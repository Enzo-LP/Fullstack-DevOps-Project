import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../models/user-type.model';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { customValidators } from "../../validators/customValidators";


@Component({
  selector: 'app-user-type-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-type-form.component.html',
  styleUrl: './user-type-form.component.css'
})
export class UserTypeFormComponent {
  isEditMode: boolean = false;
  form: FormGroup;
  id: number | null = null;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userTypeService: UserTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      label: ['', [Validators.required, customValidators.notOnlyWhitespace]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ? +params['id'] : null;
      this.isEditMode = this.id !== null;

      if (this.isEditMode) {
        this.userTypeService.getAll().subscribe(userTypes => {
          const match = userTypes.find(t => t.id === this.id);
          if (match) {
            this.form.patchValue({ label: match.typeName });
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
      const userType: UserType = { typeName: this.form.value.label };
      if (this.id !== null) {
        this.userTypeService.update(this.id, userType).subscribe(() => {
          console.log('Updated successfully');
          this.router.navigate(['/user-type-list']);
        });
      } else {
        this.userTypeService.create(userType).subscribe(() => {
          console.log('Created successfully');
          this.router.navigate(['/user-type-list']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  get label() {
    return this.form.get('label');
  }

}