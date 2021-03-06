import { Artist } from "./../../../model/artist";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SpotifyService } from "src/app/services/spotify.service";
import { Track } from "src/app/model/track";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-artist-detail",
  templateUrl: "./artist-detail.component.html",
  styleUrls: ["./artist-detail.component.scss"],
})
export class ArtistDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  artist: Artist;
  trackOfArtist: Track[];
  artistId: string;
  checkFollow: boolean;
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    this.route.params.subscribe((p) => {
      let artistId = p.id;
      this.isfollowArtist(artistId);
      this.spotifyService.getArtist(artistId).then(
        (data) => {
          this.artist = data;
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getArtistTopTrack(artistId).then((data) => {
        this.trackOfArtist = data.tracks;
      });
    });
  }
  followArtist(id: string, name: string) {
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
      this.checkFollow = data[0];
    });
  }
  unFollowArtist(id: string, name: string) {
    let artistId: string[] = [];
    artistId.push(id);
    this.toastr.warning("Unfollowed", name);
    this.spotifyService.unfollowArtist(artistId);
    this.isfollowArtist(id);
  }
  playPlaylist() {
    this.toastr.info("Coming Soon .......");
  }
}
