import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const superuserAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.user()?.isSuperuser) {
    return true;
  }

  return auth.loadCurrentUser().pipe(
    map((user) => {
      if (user?.isSuperuser) {
        return true;
      }
      return router.createUrlTree(['/admin/login']);
    }),
  );
};
