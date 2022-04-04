import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';

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
