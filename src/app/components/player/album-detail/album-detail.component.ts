import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

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
  albums: any = [];
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
          this.albums = data;
          this.albumImg = data.images[1].url;
          this.albumType = data.album_type;
          this.albumName = data.name;
          this.albumId = data.artists[0].id;
          this.albumArtistName = data.artists[0].name;
          this.totalTrack = data.tracks.total;
          console.log(this.albums);
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
