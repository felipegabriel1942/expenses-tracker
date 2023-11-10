import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './@core/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./@modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./@modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
