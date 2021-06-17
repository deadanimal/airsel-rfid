import { Component, OnInit, ElementRef } from "@angular/core";
import { AMROUTES, IROUTES, PLANNEROUTES } from "../../shared/menu/menu-items";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { JwtService } from 'src/app/shared/handler/jwt/jwt.service';



import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  // user type enum
  enum = {
    "AM": "Admin",
    "OP": "Operator",
    "TC": "Technical Crew",
    "CR": "Contractor",
    "PL": "Planner", 
  } 
  
  username: String = '';

  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;

  // Name
  public name: string = ''
  role: string;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService

  ) {
    this.location = location;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove("g-sidenav-pinned");
          document.body.classList.add("g-sidenav-hidden");
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit() {
    // get current user
    let sampar = this.authService.decodedToken();
    this.username = sampar.username;

    // get user data
    this.userService.getOne(sampar.user_id).subscribe(
      (res) => {
        console.log("RES", res);
        this.role = res.user_type;
      },
      (err) => {
        console.log("err", err);
      }
    );

    
    // if (this.router.url.includes("/ams/")) {
    //   this.listTitles = AMROUTES.filter(listTitle => listTitle);
    //   this.role = "AMS";
    // }
    // else if (this.router.url.includes("/inv/")) {
    //   this.listTitles = IROUTES.filter(listTitle => listTitle);
    //   this.role = "INV";
    // }
    // else if (this.router.url.includes("/planner/")) {
    //   this.listTitles = PLANNEROUTES.filter(listTitle => listTitle);
    //   this.role = "PLANNER";
    // }
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logoutConfirmation() {
    console.log('Want to logout?')
    swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: 'Yes, logout',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {

        this.jwtService.destroyToken();
        this.router.navigate(['/auth/login']);

        // to do
        // destroy token (jwtService) on logout
        // this.accessToken = this.jwtService.getToken("accessToken");
        // then navigate to login 
      }
    });
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
  openSidebar() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
}
