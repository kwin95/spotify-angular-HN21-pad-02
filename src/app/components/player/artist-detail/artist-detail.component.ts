import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-artist-detail",
  templateUrl: "./artist-detail.component.html",
  styleUrls: ["./artist-detail.component.scss"],
})
export class ArtistDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private toastr: ToastrService
  ) {}
  artist: any;
  // artistUrl: string;
  // artistName: string;
  // artistFollow: number;
  trackOfArtist: any;
  artistId: string;
  isFollowArtist: boolean;
  ngOnInit() {
    this.route.params.subscribe((p) => {
      let artistId = p.id;
      this.isfollowArtist(artistId);
      this.spotifyService.getArtist(artistId).then(
        (data) => {
          this.artist = data;
          // this.artistUrl = data.images[1].url;
          // this.artistName = data.name;
          // this.artistFollow = data.followers.total;
          this.artistId = data.id;
          console.log(this.artist);
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getArtistTopTrack(artistId).then(
        (data) => {
          this.trackOfArtist = data.tracks;
          console.log(this.trackOfArtist);
        },
        function (err) {
          console.error(err);
        }
      );
    });
  }
  followArtist(id: string, name) {
    let artistId: string[] = [];
    artistId.push(id);
    this.spotifyService.followArtist(artistId);
    this.toastr.success("followed", name);
    this.isfollowArtist(id);
  }
  isfollowArtist(id: string) {
    let artistId: string[] = [];
    artistId.push(id);

    this.spotifyService.isFollowArtist(artistId).then((data) => {
      this.isFollowArtist = data[0];
    });
  }
  unFollowArtist(id: string, name) {
    let artistId: string[] = [];
    artistId.push(id);
    this.toastr.warning("Unfollowed", name);
    this.spotifyService.unfollowArtist(artistId);
    this.isfollowArtist(id);
  }
}
