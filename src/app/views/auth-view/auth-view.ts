import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './auth-view.html',
  styleUrls: ['./auth-view.css']
})
export class AuthView {
  username = '';
  password = '';
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    this.error = null;
    this.apiService.authenticate(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        const redirectUrl = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');
        this.router.navigateByUrl(redirectUrl);
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
