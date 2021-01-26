
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { ToastService } from '@app/services/toast.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  myForm: FormGroup;
  loading = false;
  submitted = false;
  disabled = true;

  constructor(
    private fb: FormBuilder,
    private toastNoti : ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService, 
    ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        login: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get f() { return this.myForm.controls; }


  hasError(fc: AbstractControl): string {
    if (fc.touched && fc.valid) {
      return 'blueColor';
      
    } else if (fc.touched && fc.invalid) {
      return 'redColor';
      
    } else {

      return 'grayColor';
       
    }
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.myForm.valid) {
       console.warn(this.myForm.value);
    } else {
      Object.keys(this.myForm.controls).forEach(tControl => {
        const control = this.myForm.get(tControl);
        control.markAsTouched();
      })
    }

    if (this.myForm.invalid) {
      console.log('Deu errado')
      return;
    }

    this.loading = true;
        this.accountService.login(this.f.login.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.toastNoti.showError('Usuário inválido', 'Falhou');
                    console.log(error)
                    this.loading = false;
                }
            });
  }

  showToaster(){
    if(this.myForm.invalid){
      this.toastNoti.showError("Preencha todos os campos!!", "Falha")
    }
  }

  get login() {
    return this.myForm.get('login');
  }

  get password() {
    return this.myForm.get('password');
  }
}
