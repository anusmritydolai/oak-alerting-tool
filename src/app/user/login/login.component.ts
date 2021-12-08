import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
    if (this.form.valid) {
      // this.loading = true;
      this.authService.login(this.form.value).subscribe(
        (result) => {
          if (result.success) {
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('site_slug', result.data.site.slug);
   this.router.navigate(['/alert']);
          }
        });
      }
      else {
        this.form.markAllAsTouched();
      }
  }
}
