import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GMainComponent } from '../g-main/g-main.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        {path: '', redirectTo: "/home", pathMatch: 'full'},
        {path: 'home', component: GMainComponent}
      ])
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}