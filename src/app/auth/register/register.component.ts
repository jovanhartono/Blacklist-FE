import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserRegister} from '../../interfaces/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(8)
      ]],
      password: ['' , [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{5,30}$/)
      ]],
      isChecked: false
    });

  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get phoneNumber(): AbstractControl {
    return this.registerForm.get('phoneNumber');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get isChecked(): AbstractControl {
    return this.registerForm.get('isChecked');
  }

  registerFormSubmit(): void{
    const user: UserRegister = {
      username: this.username.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      password: this.password.value
    };
    this.authService.register(user).subscribe( () => {
      console.log(user);
      console.log('register success');
      this.registerForm.reset();
    }, (errorMessage) => {
      console.log(errorMessage.message);
    });
  }
}
