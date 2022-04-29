import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SpotifyService } from "src/app/services/spotify.service";
import { Playlist } from "src/app/model/playlist";

@Component({
  selector: "app-playlist-detail",
  templateUrl: "./playlist-detail.component.html",
  styleUrls: ["./playlist-detail.component.scss"],
})
export class PlaylistDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.checkFollowPlaylist();
  }
  queryString: string;
  isFollow: boolean;
  playlist: Playlist;
  playlistFollow: number;
  totalSong: number;
  type: string;
  tracks: any = [];
  bgImage: string = "";
  trackSearch: any;
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    let token = localStorage.getItem("token");
    this.authService.defineAccessToken(token);
    this.renderPlaylist();
    this.checkFollowPlaylist();
  }
  renderPlaylist() {
    this.route.params.subscribe((p) => {
      let id = p.id;
      this.spotifyService.getPlaylistbyId(id).then(
        (data) => {
          this.playlist = data;
          this.playlistFollow = data.followers.total;
          this.totalSong = data.tracks.items.length;
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getPlaylistCoverImg(id).then(
        (data) => {
          if (data.length === 0) {
            this.bgImage = "../../../../assets/Music.jpg";
          } else {
            this.bgImage = data[0]["url"];
          }
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getPlayListTrack(id).then((data) => {
        this.tracks = data.items;
        return data.items;
      });
    });
  }

  followPlaylist(id: string, playlistName: string) {
    this.toastr.success("followed", playlistName);
    this.spotifyService.followPlaylist(id);
    this.checkFollowPlaylist();
  }
  unfollowPlaylist(id: string, playlistName: string) {
    this.toastr.warning("Unfollow", playlistName);
    this.spotifyService.unfollowPlaylist(id);
    this.checkFollowPlaylist();
  }

  checkFollowPlaylist() {
    this.route.params.subscribe((p) => {
      let id = p.id;

      this.authService.getAcessToken().subscribe((res) => {
        let token = res["access_token"];

        let userId = localStorage.getItem("userId");
        let userIds: any = [];
        userIds.push(userId);
        this.spotifyService.checkPlaylistFollow(id, userIds).then((data) => {
          {
            this.isFollow = data[0];
          }
        });
      });
    });
  }
  likeThisTrack(id: string, trackName: string) {
    console.log(id);
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);
    this.spotifyService.addLikeSong(songId, token);
    this.toastr.success("Added to liked Songs", trackName);
  }
  searchSong() {
    this.spotifyService.searchSong(this.queryString).then((data) => {
      this.trackSearch = data.tracks.items;
    });
  }
  clear() {
    this.queryString = null;
  }
  addToPlaylist(id: string, trackName: string) {
    let trackId: string[] = [];
    trackId.push(id);
    this.toastr.success("Added to playlist", trackName);
    this.route.params.subscribe((p) => {
      let playlistId = p.id;
      this.spotifyService.addToPlaylist(playlistId, trackId);
    });
  }
  playPlaylist() {
    this.toastr.info("Coming Soon .......");
  }
  confirm() {
    this.renderPlaylist();
  }
}
