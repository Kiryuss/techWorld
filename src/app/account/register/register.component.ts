import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { ToastService } from '@app/services/toast.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    dirty = false;
    submitted = false;

  constructor( private fb: FormBuilder, private accountService: AccountService, private toastService: ToastService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      marca: ['', Validators.required],
      select: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.toastService.success('Registration successful', 'Parabens');
                this.router.navigate(['../login'], {relativeTo: this.route});
            },
            error: error => {
                this.toastService.showError(error, 'Falhou');
                this.loading = false;
            }
        });
}


  hasError(fc: AbstractControl): string {
    if (fc.touched && fc.valid) {
      return 'greenColor';
      
    } else if (fc.touched && fc.invalid) {
      return 'redColor';
      
    } else {
      return 'grayColor';
       
    }
  }

  showToaster(){
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach(tControl => {
        const control = this.form.get(tControl);
        control.markAsTouched();
        control.markAsDirty();
      })
      this.toastService.showError("Preencha todos os campos!!", "Falha");
    }
  }

  

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get birthDate() {
    return this.form.get('firstName');
  }

  get gender() {
    return this.form.get('gender');
  }

}
