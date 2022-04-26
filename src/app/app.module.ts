import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { SpotifyService } from "./services/spotify.service";
import { HomeComponent } from "./components/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { SummaryPipe } from "./pipes/summary.pipe";
import { PlaylistDetailComponent } from "./components/player/playlist-detail/playlist-detail.component";
import { PlayerComponent } from "./components/player/player.component";
import { SearchComponent } from "./components/search/search.component";
import { DropdownMenuComponent } from "./components/player/dropdown-menu/dropdown-menu.component";
import { ArtistDetailComponent } from "./components/player/artist-detail/artist-detail.component";
import { AlbumDetailComponent } from "./components/player/album-detail/album-detail.component";
import { FormsModule } from "@angular/forms";
import { TrackComponent } from "./components/player/track/track.component";
import { CollectionsComponent } from "./components/player/collections/collections.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { LibraryComponent } from './components/library/library.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SummaryPipe,
    PlaylistDetailComponent,
    PlayerComponent,
    SearchComponent,
    DropdownMenuComponent,
    ArtistDetailComponent,
    AlbumDetailComponent,
    TrackComponent,
    CollectionsComponent,
    DialogComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
    }),
  ],
  entryComponents: [DialogComponent],
  providers: [SpotifyService, NavBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule {}
