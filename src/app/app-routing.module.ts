import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AlbumDetailComponent } from "./components/player/album-detail/album-detail.component";
import { ArtistDetailComponent } from "./components/player/artist-detail/artist-detail.component";
import { CollectionsComponent } from "./components/player/collections/collections.component";
import { PlayerComponent } from "./components/player/player.component";
import { PlaylistDetailComponent } from "./components/player/playlist-detail/playlist-detail.component";
import { TrackComponent } from "./components/player/track/track.component";
import { SearchComponent } from "./components/search/search.component";

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
    path: "player",
    component: PlayerComponent,
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
      },
      {
        path: "collections",
        component: CollectionsComponent,
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
    redirectTo: "login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
