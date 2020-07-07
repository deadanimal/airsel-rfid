import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  constructor(private storage: NativeStorage) {}

  getToken(title: string) {
    return this.storage.getItem(title);
  }

  saveToken(title: string, token: string) {
    this.storage.setItem(title, token);
  }

  destroyToken() {
    this.storage.clear();
  }
}
