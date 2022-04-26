import { Injectable } from "@angular/core";
import Spotify from "spotify-web-api-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  constructor(private http: HttpClient) {
    this.spotifyApi = new Spotify();
  }

  getMyPlaylist(token: string) {
    this.spotifyApi.setAccessToken(token);
    return this.spotifyApi.getUserPlaylists();
  }
  // Home Component
  getNewRealease() {
    return this.spotifyApi.getNewReleases({ limit: 10 });
  }
  getTopLists() {
    return this.spotifyApi.getCategoryPlaylists("chill", { limit: 10 });
  }

  getFeaturePlaylist() {
    return this.spotifyApi.getFeaturedPlaylists({ limit: 10 });
  }

  // Playlist Detail
  getPlaylistbyId(id: string) {
    return this.spotifyApi.getPlaylist(id);
  }
  getPlaylistCoverImg(id: string) {
    return this.spotifyApi.getPlaylistCoverImage(id);
  }
  getPlayListTrack(id: string) {
    return this.spotifyApi.getPlaylistTracks(id);
  }

  // Follow playlist
  followPlaylist(id: string) {
    return this.spotifyApi.followPlaylist(id);
  }
  unfollowPlaylist(id: string) {
    return this.spotifyApi.unfollowPlaylist(id);
  }
  checkPlaylistFollow(playlistId: string, userId: string[]) {
    return this.spotifyApi.areFollowingPlaylist(playlistId, userId);
  }
  addToPlaylist(playlistId: string, trackId: string[]) {
    return this.spotifyApi.addTracksToPlaylist(playlistId, trackId);
  }

  // Artist detail
  getArtist(id: string) {
    return this.spotifyApi.getArtist(id);
  }

  getArtistTopTrack(id: string) {
    return this.spotifyApi.getArtistTopTracks(id, "VN");
  }
  getArtistFollowed() {
    return this.spotifyApi.getFollowedArtists();
  }

  // Album get
  getAlbum(id: string) {
    return this.spotifyApi.getAlbum(id);
  }
  getAlbumTracks(id: string) {
    return this.spotifyApi.getAlbumTracks(id);
  }
  createPlaylist(userId: string, playlistName: string, playlistDesc: string) {
    return this.spotifyApi.createPlaylist(userId, {
      name: playlistName,
      description: playlistDesc,
      public: false,
    });
  }
  search(queryString: string) {
    return this.spotifyApi.search(
      queryString,
      ["artist", "album", "track", "playlist"],
      { limit: 10 }
    );
  }
  searchSong(queryString: string) {
    return this.spotifyApi.searchTracks(queryString, { limit: 10 });
  }
  getTrack(id: string) {
    return this.spotifyApi.getTrack(id);
  }
  getLikedSong() {
    return this.spotifyApi.getMySavedTracks();
  }
  addLikeSong(id: string[], token: string) {
    localStorage.setItem("token", token);
    return this.spotifyApi.addToMySavedTracks(id);
  }
  removeLikeSong(id: string[], token: string) {
    localStorage.setItem("token", token);
    return this.spotifyApi.removeFromMySavedTracks(id);
  }
  checkLikedSong(id: string[]) {
    return this.spotifyApi.containsMySavedTracks(id);
  }

  getRecentlyPlay() {
    return this.spotifyApi.getMyRecentlyPlayedTracks();
  }
  //Follow artist
  followArtist(id: string[]) {
    return this.spotifyApi.followArtists(id);
  }
  unfollowArtist(id: string[]) {
    return this.spotifyApi.unfollowArtists(id);
  }
  isFollowArtist(id: string[]) {
    return this.spotifyApi.isFollowingArtists(id);
  }
}
