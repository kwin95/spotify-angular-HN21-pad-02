import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { observable } from "rxjs";

import { SpotifyService } from "src/app/services/spotify.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private dialogRef: MatDialog
  ) {}

  myPlaylists: any = [];
  token: string;
  userId: string;
  ngOnInit() {
    this.getPlaylist();
  }

  getPlaylist() {
    let token = localStorage.getItem("token");
    this.spotifyService.getMyPlaylist(token).then(
      (data) => {
        this.myPlaylists = data.items;
      },
      function (err) {
        console.error(err);
      }
    );
  }
  addNewPlaylist() {
    const dialogRef = this.dialogRef.open(DialogComponent, {
      data: {
        playlistName: "",
        playlistDesc: "",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userId = localStorage.getItem("userId");
        this.spotifyService
          .createPlaylist(this.userId, result.playlistName, result.playlistDesc)
          .then((res) => {
            this.getPlaylist();
          });
      }
    });
  }
}
