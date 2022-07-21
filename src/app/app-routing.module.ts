import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";
import {AppComponent} from "./app.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
