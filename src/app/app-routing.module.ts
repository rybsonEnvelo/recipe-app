import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RoleGuard } from './shared/guards/role.guard';
import { Role } from './shared/enums/Role.enum';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'form',
            component: RecipeFormComponent,
            canActivate: [RoleGuard],
            data: { roles: [Role.AUTHOR] },
          },
          {
            path: 'details',
            component: RecipeDetailsComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main',
      },
      {
        path: '**',
        redirectTo: 'main',
      },
    ]),
  ],
})
export class AppRoutingModule {}
