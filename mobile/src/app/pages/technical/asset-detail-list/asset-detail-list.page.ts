import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MenuController, LoadingController, } from "@ionic/angular";

import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';

@Component({
  selector: "app-asset-detail-list",
  templateUrl: "./asset-detail-list.page.html",
  styleUrls: ["./asset-detail-list.page.scss"],
})
export class AssetDetailListPage implements OnInit {
  // List
  assetregistrations = [];
  assetLocatioSyncdata: any

  constructor(
    public menu: MenuController,
    public notificationService: NotificationsService,
    private assetregistrationService: AssetRegistrationsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private assetsService: AssetsService,
    private assetLocatioSyncService: AssetLocatioSyncService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.getAsset(this.router.getCurrentNavigation().extras.state.badge_no);

      }
    });
  }

  getAsset(badge_no: string) {
    // console.log("badge_no =", badge_no)
    this.assetsService.filter("badge_no=" + badge_no).subscribe(
      (res) => {
        console.log("assetregistrations=res", res);
        this.assetregistrations = res;
        if (res[0].attached_to_asset_id == '') {
          this.assetLocatioSyncService.filter("node_id=" + this.assetregistrations[0].node_id).subscribe(
            (res) => {
              console.log("assetLocatioSyncServiceres>>>", res);
              // this.assetregistrations = res;
              // this.assetLocatioSyncdata = res[0].description
              if (res.length > 0) {
                this.assetLocatioSyncdata = res[0].description
              } else {
                this.assetLocatioSyncdata = '-'
              }
              // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
            },
            (err) => {
              console.error("err", err);
            }
          );
        } else {

          this.assetsService.filter("asset_id=" + res[0].attached_to_asset_id).subscribe(
            (resA) => {
              console.log("assetqqqqqqqqq=res", resA);

              this.assetLocatioSyncService.filter("node_id=" + resA[0]['node_id']).subscribe(
                (resAls) => {
                  console.log("resAls>><<>>", resAls)
                  if (resAls.length > 0) {
                    this.assetLocatioSyncdata = resAls[0].description
                  } else {
                    this.assetLocatioSyncdata = '-'
                  }
                  // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
                },
                (err) => {
                  console.error("err", err);
                }
              );

              this.assetregistrations = res;
            }, (error) => {
              console.log(error)
            }
          )
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter AssetDetailListPage");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave AssetDetailListPage")
  }

  ngOnInit() {
    console.log("ngOnInit AssetDetailListPage");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy AssetDetailListPage");
  }

  clickEdit(assetregistration) {
    let navigationExtras: NavigationExtras = {
      state: {
        asset_detail: assetregistration,
      },
    };

    this.router.navigate(["/technical/asset-detail"], navigationExtras);
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
