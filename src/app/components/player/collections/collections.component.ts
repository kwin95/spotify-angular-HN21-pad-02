import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { LikeTrack } from "src/app/model/track";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  likeCollection: LikeTrack[] = [];
  totalSong: number;
  userName: string;

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    this.authService.getInforUser().then((data) => {
      this.userName = data.display_name;
    });
    this.getLikedSong();
  }
  getLikedSong() {
    this.spotifyService.getLikedSong().then(
      (data) => {
        this.likeCollection = data.items;
        this.totalSong = data.items.length;
      },
      function (err) {
        console.error(err);
      }
    );
  }
  removeLikeSongs(id: string[], trackName: string) {
    this.toastr.warning("have remove from liked", trackName);
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);

    this.spotifyService.removeLikeSong(songId, token);
    this.getLikedSong();
  }
}
