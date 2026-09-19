import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = getErrorMessage(error);
      snackBar.open(message, 'Fermer', { duration: 5000 });
      return throwError(() => error);
    })
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 400) return 'Requête invalide.';
  if (error.status === 401) return 'Session expirée. Veuillez vous reconnecter.';
  if (error.status === 403) return 'Accès refusé pour votre profil.';
  if (error.status === 404) return 'Ressource introuvable.';
  if (error.status === 409) return 'Conflit de données détecté.';
  if (error.status === 422) return 'Données invalides. Vérifiez les champs.';
  if (error.status === 500) return 'Erreur du serveur. Réessayez plus tard.';

  return error.message || 'Une erreur est survenue.';
}
