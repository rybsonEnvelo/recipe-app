import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeTileComponent } from './recipe/recipe-tile/recipe-tile.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';

import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FirstLetterUpperCasePipe } from './shared/pipes/first-letter-upper-case.pipe';
import { MultiplyStarsPipe } from './shared/pipes/multiply-stars.pipe';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrimInputDirective } from './shared/directives/trim-input.directive';
import { ModalComponent } from './recipe/modal/modal.component';
import { AuthComponent } from './auth/auth.component';
import { UserPanelComponent } from './header/user-panel/logout.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeTileComponent,
    RecipeFormComponent,
    RecipeDetailsComponent,
    MainComponent,
    FirstLetterUpperCasePipe,
    MultiplyStarsPipe,
    TrimInputDirective,
    ModalComponent,
    AuthComponent,
    UserPanelComponent,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
