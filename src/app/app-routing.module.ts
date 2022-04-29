import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EndUserAgreementComponent } from "./components/end-user-agreement/end-user-agreement.component";
import { HomeComponent } from "./components/home/home.component";
import { LibraryComponent } from "./components/library/library.component";
import { LoginComponent } from "./components/login/login.component";
import { AlbumDetailComponent } from "./components/player/album-detail/album-detail.component";
import { ArtistDetailComponent } from "./components/player/artist-detail/artist-detail.component";
import { CollectionsComponent } from "./components/player/collections/collections.component";
import { PlayerComponent } from "./components/player/player.component";
import { PlaylistDetailComponent } from "./components/player/playlist-detail/playlist-detail.component";
import { TrackComponent } from "./components/player/track/track.component";
import { SearchComponent } from "./components/search/search.component";
import { LoginGuardGuard } from "./guards/login-guard.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "end-user-agreement",
    component: EndUserAgreementComponent,
  },
  {
    path: "player",
    component: PlayerComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "search",
        component: SearchComponent,
        canActivate: [LoginGuardGuard],
      },
      {
        path: "collections",
        component: CollectionsComponent,
      },
      {
        path: "library",
        component: LibraryComponent,
      },
      {
        path: "playlist/:id",
        component: PlaylistDetailComponent,
      },
      {
        path: "artist/:id",
        component: ArtistDetailComponent,
      },
      {
        path: "albums/:id",
        component: AlbumDetailComponent,
      },
      {
        path: "track/:id",
        component: TrackComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
