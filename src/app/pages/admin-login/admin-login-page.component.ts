import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-login-page.component.html',
  styleUrl: './admin-login-page.component.scss',
})
export class AdminLoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected username = '';
  protected password = '';
  protected submitState: 'idle' | 'sending' | 'error' = 'idle';

  protected login(event: Event): void {
    event.preventDefault();
    if (!this.username || !this.password || this.submitState === 'sending') {
      return;
    }

    this.submitState = 'sending';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl('/admin/dashboard'),
      error: () => {
        this.submitState = 'error';
      },
    });
  }
}
