import { Component, OnInit } from "@angular/core";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material";

import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SpotifyService } from "src/app/services/spotify.service";
import { Option } from "../player/dropdown-menu/dropdown-menu.component";
@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  options: Option[] = [
    {
      name: "Account Infor",
      value: 1,
    },
    {
      name: "Logout",
      value: 2,
    },
  ];
  myPlaylists: any;
  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialog
  ) {}
  userInfo: string;
  userId: string;
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 600);
    let token = localStorage.getItem("token");
    this.spotifyService.defineAccessToken(token);
    this.spotifyService.getInforUser().then(
      (data) => {
        console.log(data);

        this.userInfo = data.display_name;
        this.userId = data.id;
        return data;
      },
      function (err) {
        console.error(err);
      }
    );
    this.getPlaylist();
  }

  getPlaylist() {
    let token = localStorage.getItem("token");
    this.spotifyService.getMyPlaylist(token).then(
      (data) => {
        this.myPlaylists = data.items;
        console.log(this.myPlaylists);
      },
      function (err) {
        console.error(err);
      }
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  onSelect(value) {
    if (value === 2) {
      this.logout();
    }
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
        // this.playlistName = result.playlistName;
        // this.playlistDesc = result.playlistDesc;
        this.spotifyService
          .createPlaylist(this.userId, result.playlistName, result.playlistDesc)
          .then((res) => {
            this.getPlaylist();
          });
      }
    });
  }
}
