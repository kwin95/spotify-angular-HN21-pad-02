import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { Album } from "src/app/model/album";

@Component({
  selector: "app-album-detail",
  templateUrl: "./album-detail.component.html",
  styleUrls: ["./album-detail.component.scss"],
})
export class AlbumDetailComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}
  album: Album;
  albumImg: string;
  albumType: string;
  albumName: string;
  albumId: string;
  albumArtistName: string;
  totalTrack: number;
  trackOfAlbum: any = [];
  ngOnInit() {
    this.route.params.subscribe((p) => {
      let id = p.id;
      this.spotifyService.getAlbum(id).then(
        (data) => {
          this.album = data;
          console.log(this.album);
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getAlbumTracks(id).then(
        (data) => {
          this.trackOfAlbum = data.items;
        },
        function (err) {
          console.error(err);
        }
      );
    });
  }
}
