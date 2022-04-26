import { Component, OnInit } from "@angular/core";
import { Artist } from "src/app/model/artist";
import { Playlist } from "src/app/model/playlist";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  followedPlaylists: any = [];
  artists: Artist[] = [];
  ngOnInit() {
    let token = localStorage.getItem("token");
    this.spotifyService.getMyPlaylist(token).then(
      (data) => {
        this.followedPlaylists = data.items;
        console.log(this.followedPlaylists);
      },
      function (err) {
        console.error(err);
      }
    );
    this.spotifyService.getArtistFollowed().then((data) => {
      this.artists = data.artists.items;
      console.log(this.artists);
    });
  }
}
