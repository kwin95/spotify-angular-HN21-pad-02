import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { SpotifyService } from "./services/spotify.service";
import { HomeComponent } from "./components/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { SummaryPipe } from './pipes/summary.pipe';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavBarComponent, SummaryPipe, PlaylistDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SpotifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
