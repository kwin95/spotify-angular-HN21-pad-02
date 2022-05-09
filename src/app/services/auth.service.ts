import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Spotify from "spotify-web-api-js";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;

  private client_Id = "f143bfa6c67845d8a07602e8fb560312"; // dev test
  private client_Secret = "60b16bff56814be3ba5d8010fbd6ff10";
  // private client_Id = "c7253f1e3dc54533819588fb25163f18"; // user deplpoy
  // private client_Secret = "6277e235244d45cf9c9186b0e0d62d46";

  encoder = btoa(`${this.client_Id}:${this.client_Secret}`);
  public scope = [
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-follow-read",
    " user-follow-modify",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
  ];
  constructor(private http: HttpClient) {
    this.spotifyApi = new Spotify();
  }
  getAcessToken() {
    const authTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = "grant_type=client_credentials";
    return this.http.post(authTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization: "Basic  " + this.encoder,
        "Content-Type": "application/x-www-form-urlencoded;",
      }),
    });
  }
  authozireAccount() {
    let redirect_uri = "http://localhost:4200/login";
    // const redirect_uri =
    //   "https://thanghk95-hn21-frf-pad-02.firebaseapp.com/login";

    let authEndPoint = "https://accounts.spotify.com/authorize?";
    let responseType = "&response_type=token&show_dialog=true";
    let option = {
      response_type: "code",
      client_id: this.client_Id,
      redirect_uri: redirect_uri,
    };
    let endcodeScope = `scope=${this.scope.join("%20")}`;
    let queryString =
      Object.keys(option)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(option[key])
        )
        .join("&") + "&";

    return authEndPoint + queryString + endcodeScope + responseType;
  }
  getUrlParam() {
    if (!window.location.hash) {
      return "";
    } else {
      let params = window.location.hash.substring(1).split("&");
      return params[0].split("=")[1];
    }
  }
  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem("token", token);
  }
  getInforUser() {
    return this.spotifyApi.getMe();
  }
}
