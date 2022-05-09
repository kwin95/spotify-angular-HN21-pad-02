import { Component, OnInit, ViewChild } from "@angular/core";

import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

import { Option } from "../player/dropdown-menu/dropdown-menu.component";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  options: Option[] = [
    {
      name: "Setting ",
      value: 1,
    },
    {
      name: "Logout",
      value: 2,
    },
  ];
  myPlaylists: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,

    private toastr: ToastrService
  ) {}
  userInfo: string;
  userId: string;

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 600);
    let token = localStorage.getItem("token");
    this.authService.defineAccessToken(token);
    this.authService.getInforUser().then(
      (data) => {
        this.userInfo = data.display_name;
        this.userId = data.id;
        return data;
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
    if (value === 1) {
      this.toastr.info("This feature is comming soon.......");
    }
    if (value === 2) {
      this.logout();
    }
  }
}
