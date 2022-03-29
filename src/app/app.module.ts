import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeDescriptionComponent } from './recipe-description/recipe-description.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeTileComponent,
    RecipeFormComponent,
    RecipeDescriptionComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
