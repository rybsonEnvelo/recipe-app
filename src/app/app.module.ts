import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FirstLetterUpperCasePipe } from './shared/first-letter-upper-case.pipe';
import { MultiplyStarsPipe } from './shared/multiply-stars.pipe';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

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
  ],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
