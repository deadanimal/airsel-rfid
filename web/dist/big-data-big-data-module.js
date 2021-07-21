(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["big-data-big-data-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Big Data Analytics - Asset Condition Score\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h4 class=\"mb-0\">Search filter</h4>\n            </div>\n            <div class=\"col-auto text-right\">\n              <button class=\"btn btn-default btn-sm\" (click)=\"filter()\">Search</button>\n              <button class=\"btn btn-secondary btn-sm\" (click)=\"reset()\">Reset</button>\n            </div>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Owning Organization</label>\n                <select class=\"form-control form-control-sm\" [(ngModel)] = \"asset_owning\">\n                  <option value=\"\">Please select</option>\n                  <option *ngFor=\"let assetowningdepartment of assetowningdepartment\" value=\"{{assetowningdepartment.value}}\">\n                    {{assetowningdepartment.name}}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n                <input\n                  type=\"text\"\n                  class=\"form-control form-control-sm\"\n                  placeholder=\"Please select date range\"\n                  bsDaterangepicker\n                  [(ngModel)] = \"selected_date\"\n                  [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\"\n                />\n              </div>\n            </div>\n            <!-- <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Work Category</label>\n                <select class=\"form-control form-control-sm\">\n                  <option value=\"\">Please select</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n          <div class=\"row\">\n            <!-- <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n                <input\n                  type=\"text\"\n                  class=\"form-control form-control-sm\"\n                  placeholder=\"Please select date range\"\n                  bsDaterangepicker\n                  [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\"\n                />\n              </div>\n            </div>\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Region</label>\n                <select class=\"form-control form-control-sm\">\n                  <option value=\"\">Please select</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <h3 class=\"mb-0\">WAMS: Asset Condition Score</h3>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h3>Average (Overall)</h3>\n                  <small>Data as of {{today | date:'d MMMM y'}}</small><br />\n\n                  <span class=\"text-info\"> ● </span>\n                  <small\n                    >New asset register on {{firstDayLastMonth | date:'MMMM'}}:\n                    <strong class=\"font-weight-bolder\"\n                      >{{ totalassetsLastMonth }} nos.</strong\n                    ></small\n                  >\n                </div>\n                <div\n                  class=\"col\"\n                  style=\"\n                    display: flex;\n                    justify-content: center;\n                    align-items: center;\n                  \">\n                  <p class=\"font-weight-bolder\" style=\"font-size: 48px;\">\n                    {{ totalAssetToday }}\n                  </p>\n                </div>\n              </div>\n              <hr style=\"margin-bottom: 0; margin-top: 0;\" />\n              <div class=\"text-center\">\n                <h4>Percentage Asset Condition Rating Completion:</h4>\n                <h1>{{ PercentageAssetConditionRating }}%</h1>\n              </div>\n            </div>\n            <div class=\"col-lg-6 col-xs-12\">\n              <p>\n                Asset that completed Preventive Maintenance:\n                <!-- <strong>37,298 nos</strong> -->\n                <strong>{{completedPreventiveMaintenance}}</strong>\n              </p>\n              <span class=\"text-info\"> ● </span>\n              <small\n                >PM Trigger have been completed on\n                <strong class=\"font-weight-bolder\"\n                  >{{latestMonth | date:'MMMM y'}}.</strong\n                ></small\n              ><br />\n              <span class=\"text-info\"> ● </span>\n              <small\n                >Hence, the asset condition ratings will be completely captured\n                by\n                <strong class=\"font-weight-bolder\"\n                  >{{latestMonth | date:'MMMM y'}}</strong\n                ></small\n              ><br /><br />\n\n              <small class=\"text-muted\"\n                >* No record due to the remaining assets are waiting for\n                maintenance schedule / no maintenance activity conducted</small\n              >\n            </div>\n            <div class=\"table-responsive pt-3\">\n              <table class=\"table align-items-center table-flush\">\n                <thead>\n                  <tr>\n                    <th></th>\n                    <th>Numbers of Asset</th>\n                    <th class=\"text-center\">0<br />No record*</th>\n                    <th class=\"text-center\">1<br />Very Good</th>\n                    <th class=\"text-center\">2<br />Good</th>\n                    <th class=\"text-center\">3<br />Average</th>\n                    <th class=\"text-center\">4<br />Poor</th>\n                    <th class=\"text-center\">5<br />Extremely<br />Critical</th>\n                  </tr>\n                </thead>\n\n                <tbody>\n                  <tr\n                    *ngFor=\"\n                      let tableAssetConditionStore of tableAssetConditionStores\n                    \"\n                  >\n                    <td class=\"font-weight-bolder\">\n                      {{ tableAssetConditionStore.title }}\n                    </td>\n                    <td class=\"text-center font-weight-bolder\">\n                      {{ tableAssetConditionStore.noasset | number }}\n                    </td>\n                    <td class=\"text-center font-weight-bolder\">\n                      {{ tableAssetConditionStore.zero | number }}\n                      <!-- {{nullassetOwning | number}} -->\n                    </td>\n                    <td\n                      class=\"text-center font-weight-bolder\"\n                      style=\"background-color: #9dcb82;\"\n                    >\n                      {{ tableAssetConditionStore.one | number }}\n                    </td>\n                    <td\n                      class=\"text-center font-weight-bolder\"\n                      style=\"background-color: #bbdcac;\"\n                    >\n                      {{ tableAssetConditionStore.two | number }}\n                    </td>\n                    <td\n                      class=\"text-center font-weight-bolder\"\n                      style=\"background-color: #fbff04;\"\n                    >\n                      {{ tableAssetConditionStore.three | number }}\n                    </td>\n                    <td\n                      class=\"text-center font-weight-bolder\"\n                      style=\"background-color: #f9b81a;\"\n                    >\n                      {{ tableAssetConditionStore.four | number }}\n                    </td>\n                    <td\n                      class=\"text-center font-weight-bolder\"\n                      style=\"background-color: #f50f1d;\"\n                    >\n                      {{ tableAssetConditionStore.five | number }}\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<ngx-spinner bdColor=\"rgba(51, 51, 51, 0.8)\" size=\"default\" type=\"ball-spin-clockwise\" [fullScreen] = \"false\">  \n  <p style=\"color: white\">Please Wait. </p>  \n  </ngx-spinner>  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Big Data Analytics - Total Asset Maintenance\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h4 class=\"mb-0\">Search filter</h4>\n            </div>\n            <div class=\"col-auto text-right\">\n              <button class=\"btn btn-default btn-sm\">Search</button>\n              <button class=\"btn btn-secondary btn-sm\">Reset</button>\n            </div>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Owning Organization</label>\n                <select class=\"form-control form-control-sm\">\n                  <option value=\"\">Please select</option>\n                  <option *ngFor=\"let assetowningdepartment of assetowningdepartment\" value=\"{{assetowningdepartment.value}}\">\n                    {{assetowningdepartment.name}}\n                  </option>\n                </select>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n                <input\n                  type=\"text\"\n                  class=\"form-control form-control-sm\"\n                  placeholder=\"Please select date range\"\n                  bsDaterangepicker\n                  [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\"\n                />\n              </div>\n            </div>\n            \n          </div>\n          \n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <h3 class=\"mb-0\">\n            WAMS: Total Asset Maintenance generated in {{ date | date:'MMMM, y'}}\n          </h3>\n        </div>\n        <div class=\"card-body\">\n          <small\n            >Total Asset Maintenance generated in WAMS in {{ date | date:'MMMM, y'}}:\n            <span class=\"font-weight-bolder\" style=\"font-size: 24px;\"\n              >{{ totalAssetMaintenance }} nos</span\n            ></small>\n\n          <div class=\"row pt-3\">\n            <div class=\"col-lg-1\"></div>\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivone\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">CBS</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivtwo\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">DISTRIBUTION</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivthree\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">ESD</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivfour\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">FLEET</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivfive\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">LAND</h3>\n            </div>\n            <div class=\"col-lg-1\"></div>\n          </div>\n\n          <div class=\"row pt-3\">\n            <div class=\"col-lg-1\"></div>\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivsix\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">NRW</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivseven\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">PD-N</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piediveight\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">PD-S</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivnine\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">SCADA</h3>\n            </div>\n\n            <div class=\"col-lg-2 col-xs-12\">\n              <div id=\"piedivten\" style=\"width: 100%;\"></div>\n              <h3 class=\"m-0 text-center\">WQ</h3>\n            </div>\n\n            <div class=\"col-lg-1\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ngx-spinner bdColor=\"rgba(51, 51, 51, 0.8)\" size=\"default\" type=\"ball-spin-clockwise\" [fullScreen] = \"false\">  \n  <p style=\"color: white\">Please Wait. </p>  \n  </ngx-spinner>  \n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Big Data Analytics - Total Asset Registered\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h4 class=\"mb-0\">Search filter</h4>\n            </div>\n            <div class=\"col-auto text-right\">\n              <button class=\"btn btn-default btn-sm\" (click)=\"filter()\">Search</button>\n              <button class=\"btn btn-secondary btn-sm\" (click)=\"getAssetRegistered()\">Reset</button>\n            </div>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Owning Organization</label>\n                <select class=\"form-control form-control-sm\" [(ngModel)]=\"asset_owning\">\n                  <option value=\"\">Please select</option>\n                  <option *ngFor=\"let assetowningdepartment of assetowningdepartment\"\n                    value=\"{{assetowningdepartment.value}}\">\n                    {{assetowningdepartment.name}}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n                <input type=\"text\" class=\"form-control form-control-sm\" placeholder=\"Please select date range\"\n                  bsDaterangepicker [(ngModel)]=\"selected_date\" [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\" />\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <h3 class=\"mb-0\">WAMS: Total Asset Registered</h3>\n        </div>\n        <div class=\"card-body\">\n          <h3 class=\"mb-0\">Asset Registered: <strong>{{ asset_registered_length }} nos</strong></h3>\n          <small *ngIf=\"currentDate\">Data as of {{dateToday | date:'MMMM d, y'}}</small>\n\n          <small *ngIf=\"filteredDate\">Data as of {{fromDate | date:'MMMM d, y'}} - {{toDate | date:'MMMM d, y'}}</small>\n\n          <div id=\"chartdivtwo\" style=\"width: 100%; height: 500px;\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ngx-spinner bdColor=\"rgba(51, 51, 51, 0.8)\" size=\"default\" type=\"ball-spin-clockwise\" [fullScreen] = \"false\">  \n  <p style=\"color: white\">Please Wait. </p>  \n  </ngx-spinner>  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Big Data Analytics - Work Activity\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h4 class=\"mb-0\">Search filter</h4>\n            </div>\n            <div class=\"col-auto text-right\">\n              <button class=\"btn btn-default btn-sm\" (click)=\"filter()\">Search</button>\n              <button class=\"btn btn-secondary btn-sm\" (click)=\"reset()\">Reset</button>\n            </div>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Owning Organization</label>\n                <select class=\"form-control form-control-sm\" [(ngModel)]=\"asset_owning\">\n                  <option value=\"\">Please select</option>\n                  <option *ngFor=\"let assetowningdepartment of assetowningdepartment\"\n                    [value]=\"assetowningdepartment.value\">\n                    {{ assetowningdepartment.name }}</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n                <input\n                  type=\"text\"\n                  class=\"form-control form-control-sm\"\n                  placeholder=\"Please select date range\"\n                  bsDaterangepicker\n                  [(ngModel)] = \"selected_date\"\n                  [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\"\n                />\n              </div>\n            </div>\n            <!-- <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Work Category</label>\n                <select class=\"form-control form-control-sm\">\n                  <option value=\"\">Please select</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n          <div class=\"row\">\n            <!-- <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Date Range</label>\n\n                <input id=\"dateRange\" type=\"text\" class=\"form-control form-control-sm\"\n                  placeholder=\"Please select date range\" bsDaterangepicker [bsConfig]=\"{\n                    isAnimated: true,\n                    containerClass: 'theme-default',\n                    rangeInputFormat: 'MM/DD/YYYY',\n                    dateInputFormat: 'MM/DD/YYYY'\n                  }\" \n                  (ngModelChange)=\"getByDate($event)\"\n                  [(ngModel)]=\"this.filters.date\"/>\n              </div>\n            </div> -->\n            <!-- <div class=\"col-lg-6 col-xs-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label\">Region</label>\n                <select class=\"form-control form-control-sm\">\n                  <option value=\"\">Please select</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-lg-4 col-xs-12\">\n      <div class=\"card bg-info\">\n        <div class=\"card-body text-center\">\n          <h4 class=\"mb-0 text-white\">Total Work Activity Generated</h4>\n          <h1 class=\"font-weight-bolder text-white\">{{ totalWorkOrder }}</h1>\n        </div>\n      </div>\n\n      <div class=\"card bg-danger\">\n        <div class=\"card-body text-center\">\n          <h4 class=\"mb-0 text-white\">Total Numbers of Backlog</h4>\n          <div class=\"row\">\n            <div class=\"col-4 text-right\">\n              <h1 class=\"font-weight-bold\">{{ totalBackLogYesterday }}</h1>\n            </div>\n            <div class=\"col-4 pt-1\">\n              <i class=\"fas fa-arrow-right fa-2x\"></i>\n            </div>\n            <div class=\"col-4 text-left\">\n              <h1 class=\"text-white font-weight-bolder\">{{ totalBackLogToday }}</h1>\n            </div>\n          </div>\n\n          <h4 class=\"mb-0 text-white\">Backlog Percentage:</h4>\n          <div class=\"row\">\n            <div class=\"col-4 text-right\">\n              <h2 class=\"font-weight-bold\">{{ backLogPercentageYesterday }}%</h2>\n            </div>\n            <div class=\"col-4 pt-1\">\n              <i class=\"fas fa-arrow-right fa-lg\"></i>\n            </div>\n            <div class=\"col-4 text-left\">\n              <h2 class=\"text-white font-weight-bolder\">{{ backLogPercentageToday }}%</h2>\n            </div>\n          </div>\n\n          <small style=\"color: white;\">*Users are reminded to complete work activity within required by\n            date.</small>\n        </div>\n      </div>\n\n      <div class=\"alert alert-default\" role=\"alert\">\n        <strong>Definition</strong><br />\n        Work Activity Backlog: Work Activity does not completed within required\n        by date.\n      </div>\n    </div>\n\n    <div class=\"col-lg-8 col-xs-12\">\n      <div class=\"card\">\n        <div>\n          <div style=\"width: 100%; height: 500px;\" id=\"chartdivone\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<ngx-spinner bdColor=\"rgba(51, 51, 51, 0.8)\" size=\"default\" type=\"ball-spin-clockwise\" [fullScreen] = \"false\">  \n  <p style=\"color: white\">Please Wait. </p>  \n  </ngx-spinner>  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics/analytics.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics/analytics.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Big Data - Analytics</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col-sm-12 col-lg-7\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"card\">\n            <div class=\"card-header py-3 bg-secondary\">\n              <h5 class=\"text-muted ls-1 mb-0\">Chart</h5>\n              <h5 class=\"h3 mb-0\">Top Maintenance Asset</h5>\n            </div>\n\n            <div class=\"card-body p-0\">\n              <div style=\"height: 408px;\">\n                <div id=\"chartdiv\" style=\"height: 100%; width: 100%;\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"card\">\n            <div class=\"table-responsive\">\n              <table class=\"table align-items-center table-flush\">\n                <thead class=\"thead-light\">\n                  <tr>\n                    <th scope=\"col\">Venue</th>\n                    <th scope=\"col\">Preventive</th>\n                    <th scope=\"col\">Maintenance</th>\n                  </tr>\n                </thead>\n                <tbody class=\"list\">\n                  <tr>\n                    <th scope=\"row\">Pumphouse 1</th>\n                    <td>199</td>\n                    <td>135</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Pumhouse 2</th>\n                    <td>67</td>\n                    <td>32</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Pumphouse 3</th>\n                    <td>360</td>\n                    <td>79</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Pumphouse 4</th>\n                    <td>671</td>\n                    <td>321</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Pumphouse 5</th>\n                    <td>123</td>\n                    <td>56</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-12 col-lg-5\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"card\">\n            <div class=\"table-responsive\">\n              <table class=\"table align-items-center table-flush\">\n                <thead class=\"thead-light\">\n                  <tr>\n                    <th scope=\"col\">Asset</th>\n                    <th scope=\"col\">Amount</th>\n                  </tr>\n                </thead>\n                <tbody class=\"list\">\n                  <tr>\n                    <th scope=\"row\">Asset 1</th>\n                    <td>214</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Asset 2</th>\n                    <td>98</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Asset 3</th>\n                    <td>104</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Asset 4</th>\n                    <td>63</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Asset 5</th>\n                    <td>52</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"card\">\n            <div class=\"table-responsive\">\n              <table class=\"table align-items-center table-flush\">\n                <thead class=\"thead-light\">\n                  <tr>\n                    <th scope=\"col\">Maintenance</th>\n                    <th scope=\"col\">Amount</th>\n                  </tr>\n                </thead>\n                <tbody class=\"list\">\n                  <tr>\n                    <th scope=\"row\">Pending</th>\n                    <td>432</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Delayed</th>\n                    <td>108</td>\n                  </tr>\n                  <tr>\n                    <th scope=\"row\">Completed</th>\n                    <td>360</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"card\">\n            <div class=\"card-header py-3 bg-secondary\">\n              <h5 class=\"text-muted ls-1 mb-0\">Chart</h5>\n              <h5 class=\"h3 mb-0\">Maintenance Analysis</h5>\n            </div>\n\n            <div class=\"card-body p-0\">\n              <div style=\"height: 408px;\">\n                <div id=\"chartdiv1\" style=\"height: 100%; width: 100%;\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/tableau/tableau.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/tableau/tableau.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Big Data - Tableau</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"far fa-chart-bar text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div\n          id=\"vizContainerOne\"\n          style=\"display: flex; justify-content: center;\"\n        ></div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div\n          id=\"vizContainerTwo\"\n          style=\"display: flex; justify-content: center;\"\n        ></div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvYW5hbHl0aWNzLWFjcy9hbmFseXRpY3MtYWNzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.ts ***!
  \******************************************************************************/
/*! exports provided: AnalyticsAcsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsAcsComponent", function() { return AnalyticsAcsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service */ "./src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");









_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
var AnalyticsAcsComponent = /** @class */ (function () {
    function AnalyticsAcsComponent(zone, assetsService, workOrderActivityCompletionService, SpinnerService) {
        this.zone = zone;
        this.assetsService = assetsService;
        this.workOrderActivityCompletionService = workOrderActivityCompletionService;
        this.SpinnerService = SpinnerService;
        //variables
        this.today = new Date();
        this.assetsToday = [];
        this.firstDayLastMonth = new Date();
        this.assetsLastMonth = [];
        this.totalConditionRating = 0;
        this.nullassetOwning = [];
        this.assetowningdepartment = [
            { value: "CBS", name: "CUSTOMER BILLING SERVICES" },
            { value: "DISTRIBUTION", name: "DISTRIBUTION" },
            { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
            { value: "FLEET", name: "FLEET" },
            { value: "LAND", name: "LAND" },
            { value: "NRW", name: "NRW" },
            { value: "PD-N", name: "PRODUCTION NORTHERN" },
            { value: "PD-S", name: "PRODUCTION SOUTHERN" },
            { value: "SCADA", name: "SCADA" },
            { value: "WQ", name: "WATER QUALITY" },
        ];
        this.lastmonth = new Date;
        // workOrderActivityCompletion: any;
        this.completedPreventiveMaintenance = 0;
        this.latestMonth = new Date();
    }
    AnalyticsAcsComponent.prototype.ngOnInit = function () {
        // console.log("today",this.today)
        this.getAssets();
        this.getWorkOrderActivityCompletion();
        // this.getAssetConditionStores()
    };
    AnalyticsAcsComponent.prototype.getWorkOrderActivityCompletion = function () {
        var _this = this;
        this.workOrderActivityCompletionService.get().subscribe(function (response) {
            console.log('response from API is ', response);
            // this.workOrderActivityCompletion = response;
            for (var i in response) {
                if (response[i].field_1 == "PREVENTIVE MAINTENANCE") {
                    _this.completedPreventiveMaintenance += response[i].asset_location_asset_list.length;
                }
            }
            console.log("completedPreventiveMaintenance", _this.completedPreventiveMaintenance);
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsAcsComponent.prototype.getAssets = function () {
        var _this = this;
        this.SpinnerService.show();
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.owning_access_group != ""; }); })).subscribe(function (response) {
            console.log('response from API is ', response);
            _this.assets = response;
            console.log('assets', _this.assets);
            _this.totalAssets = _this.assets.length;
            console.log('totalAssets', _this.totalAssets);
            _this.getTotalAssetToday();
            _this.calcPercentageAssetConditionRating();
            _this.getAssetConditionStores();
            _this.SpinnerService.hide();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsAcsComponent.prototype.reset = function () {
        var _this = this;
        this.SpinnerService.show();
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.owning_access_group != ""; }); })).subscribe(function (response) {
            console.log('response from API is ', response);
            _this.assets = response;
            console.log('assets', _this.assets);
            _this.totalAssets = _this.assets.length;
            console.log('totalAssets', _this.totalAssets);
            _this.calcPercentageAssetConditionRating();
            _this.getAssetConditionStores();
            _this.SpinnerService.hide();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsAcsComponent.prototype.getTotalAssetToday = function () {
        var today = new Date();
        console.log("today", today);
        var assetsToday = [];
        for (var i in this.assets) {
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') == Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(today, 'yyyy-MM-dd', 'en_US'))
                this.assetsToday[i] = this.assets[i];
        }
        this.totalAssetToday = assetsToday.length;
        console.log("totalToday", this.totalAssetToday);
        console.log("assets today", this.assetsToday);
        var date = new Date();
        var firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        this.firstDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        this.firstDayLastMonth.setMonth(this.firstDayLastMonth.getMonth() - 1);
        console.log("firstDayThisMonth", firstDayThisMonth);
        console.log("firstDayLastMonth", this.firstDayLastMonth);
        for (var i in this.assets) {
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(this.firstDayLastMonth, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') < Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(firstDayThisMonth, 'yyyy-MM-dd', 'en_US'))
                this.assetsLastMonth[i] = this.assets[i];
        }
        this.totalassetsLastMonth = this.assetsLastMonth.length;
        console.log("total lastmonth", this.totalAssetToday);
        console.log("assets last month", this.assetsLastMonth);
    };
    AnalyticsAcsComponent.prototype.calcPercentageAssetConditionRating = function () {
        this.totalConditionRating = 0;
        for (var i in this.assets) {
            this.totalConditionRating += parseFloat(this.assets[i].condition_rating);
        }
        this.PercentageAssetConditionRating = (this.totalConditionRating / this.totalAssets * 100).toFixed(2);
        console.log("totalConditionRating", this.totalConditionRating);
        console.log("PercentageAssetConditionRating", this.PercentageAssetConditionRating);
    };
    AnalyticsAcsComponent.prototype.getAssetConditionStores = function () {
        this.tableAssetConditionStores = [
            { title: "CBS", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "DISTRIBUTION", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "ES-D", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "FLEET", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "LAND", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "NRW", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "PD-N", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "PD-S", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "SCADA", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
            { title: "WQ", noasset: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
        ];
        for (var i in this.assets) {
            if (this.assets[i].owning_access_group == "CBS") {
                this.tableAssetConditionStores[0].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[0].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[0].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[0].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[0].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[0].five += 1;
            }
            else if (this.assets[i].owning_access_group == "DISTRIBUTION") {
                this.tableAssetConditionStores[1].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[1].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[1].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[1].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[1].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[1].five += 1;
            }
            else if (this.assets[i].owning_access_group == "ES-D") {
                this.tableAssetConditionStores[2].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[2].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[2].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[2].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[2].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[2].five += 1;
            }
            else if (this.assets[i].owning_access_group == "FLEET") {
                this.tableAssetConditionStores[3].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[3].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[3].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[3].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[3].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[3].five += 1;
            }
            else if (this.assets[i].owning_access_group == "LAND") {
                this.tableAssetConditionStores[4].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[4].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[4].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[4].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[4].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[4].five += 1;
            }
            else if (this.assets[i].owning_access_group == "NRW") {
                this.tableAssetConditionStores[5].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[5].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[5].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[5].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[5].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[5].five += 1;
            }
            else if (this.assets[i].owning_access_group == "PD-N") {
                this.tableAssetConditionStores[6].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[6].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[6].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[6].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[6].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[6].five += 1;
            }
            else if (this.assets[i].owning_access_group == "PD-S") {
                this.tableAssetConditionStores[7].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[7].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[7].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[7].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[7].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[7].five += 1;
            }
            else if (this.assets[i].owning_access_group == "SCADA") {
                this.tableAssetConditionStores[8].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[8].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[8].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[8].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[8].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[8].five += 1;
            }
            else if (this.assets[i].owning_access_group == "WQ") {
                this.tableAssetConditionStores[9].noasset += 1;
                if (this.assets[i].condition_rating < 2)
                    this.tableAssetConditionStores[9].one += 1;
                else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
                    this.tableAssetConditionStores[9].two += 1;
                else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
                    this.tableAssetConditionStores[9].three += 1;
                else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
                    this.tableAssetConditionStores[9].four += 1;
                else if (this.assets[i].condition_rating >= 5)
                    this.tableAssetConditionStores[9].five += 1;
            }
            else {
                this.nullassetOwning.push(this.assets[i]);
            }
        }
        console.log("nullassetOwning", this.nullassetOwning);
        console.log("tableAssetConditionStores", this.tableAssetConditionStores);
    };
    AnalyticsAcsComponent.prototype.filter = function () {
        var _this = this;
        this.SpinnerService.show();
        var temp = [];
        var temp2 = [];
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.registered_datetime != null; }); })).subscribe(function (response) {
            // temp = response
            // console.log("temp", temp)
            console.log("asset_owning", _this.asset_owning);
            if (_this.asset_owning != null && _this.selected_date == null) {
                temp = response.filter(function (value) { return value.owning_access_group.includes(_this.asset_owning); });
                console.log("temp", temp);
                temp2 = temp;
            }
            else if (_this.asset_owning == null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                temp = response;
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(_this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
            }
            else if (_this.asset_owning != null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                temp = response.filter(function (value) { return value.owning_access_group.includes(_this.asset_owning); });
                console.log("temp", temp);
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(_this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
            }
            console.log("temp2", temp2);
            console.log("temp2 length", temp2.length);
            _this.assets = temp2;
            console.log('assets', _this.assets);
            _this.calcPercentageAssetConditionRating();
            _this.getAssetConditionStores();
            _this.SpinnerService.hide();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsAcsComponent.prototype.ngAfterViewInit = function () {
        this.zone.runOutsideAngular(function () { });
    };
    AnalyticsAcsComponent.prototype.ngOnDestroy = function () {
        this.zone.runOutsideAngular(function () { });
    };
    AnalyticsAcsComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_2__["AssetsService"] },
        { type: src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__["WorkOrderActivityCompletionService"] },
        { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"] }
    ]; };
    AnalyticsAcsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-analytics-acs",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics-acs.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics-acs.component.scss */ "./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_2__["AssetsService"],
            src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__["WorkOrderActivityCompletionService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]])
    ], AnalyticsAcsComponent);
    return AnalyticsAcsComponent;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvYW5hbHl0aWNzLXRhbS9hbmFseXRpY3MtdGFtLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.ts ***!
  \******************************************************************************/
/*! exports provided: AnalyticsTamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsTamComponent", function() { return AnalyticsTamComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service */ "./src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service.ts");
/* harmony import */ var src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service */ "./src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");











_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
var AnalyticsTamComponent = /** @class */ (function () {
    function AnalyticsTamComponent(zone, assetsService, workOrderActivityCompletionService, WOACALALS, SpinnerService) {
        this.zone = zone;
        this.assetsService = assetsService;
        this.workOrderActivityCompletionService = workOrderActivityCompletionService;
        this.WOACALALS = WOACALALS;
        this.SpinnerService = SpinnerService;
        this.assetowningdepartment = [
            { value: "CBS", name: "CUSTOMER BILLING SERVICES" },
            { value: "DISTRIBUTION", name: "DISTRIBUTION" },
            { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
            { value: "FLEET", name: "FLEET" },
            { value: "LAND", name: "LAND" },
            { value: "NRW", name: "NRW" },
            { value: "PD-N", name: "PRODUCTION NORTHERN" },
            { value: "PD-S", name: "PRODUCTION SOUTHERN" },
            { value: "SCADA", name: "SCADA" },
            { value: "WQ", name: "WATER QUALITY" },
        ];
        this.totalAssetMaintenance = 0;
        this.date = new Date();
    }
    AnalyticsTamComponent.prototype.ngOnInit = function () {
        this.getAssets();
    };
    AnalyticsTamComponent.prototype.getAssets = function () {
        var _this = this;
        this.SpinnerService.show();
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.owning_access_group != ""; }); })).subscribe(function (response) {
            console.log('response from API is ', response);
            _this.assets = response;
            console.log('assets', _this.assets);
            _this.getWorkOrderActivity();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsTamComponent.prototype.getWorkOrderActivity = function () {
        var _this = this;
        // let temp = []
        this.workOrderActivityCompletionService.get().subscribe(function (response) {
            console.log('response from API is ', response);
            _this.WorkOrderActivity = response;
            console.log("WorkOrderActivity", _this.WorkOrderActivity);
            _this.getChartData();
            // this.initChartOne();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsTamComponent.prototype.getChartData = function () {
        var _this = this;
        this.workOrderActivityCompletionService;
        var cbs = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var distribution = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var esd = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var fleet = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var land = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var nrw = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var pdn = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var pds = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var scada = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var wq = [
            { type: "Preventive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#2174C7") },
            { type: "Corrective Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#D8D6D6") },
            { type: "Predictive Maintenance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#BF9000") },
            { type: "Compliance", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#eb4034") },
            { type: "Installation Testing Commissioning", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#d9eb34") },
            { type: "Disposal", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32ba37") },
            { type: "Redesign", total: 0, color: _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#32bab8") },
        ];
        var temp = this.WorkOrderActivity;
        var temp2;
        var temp3;
        console.log("temp", temp);
        var _loop_1 = function (j) {
            console.log("id : ", temp[j]);
            this_1.WOACALALS.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.id == temp[j].asset_location_asset_list[0]; }); })).subscribe(function (response) {
                console.log('response from API is ', response);
                temp2 = response;
                console.log("temp2", temp2);
                temp3 = _this.assets.filter(function (value) { return value.asset_id.includes(temp2[0].asset_id); });
                console.log("temp3 debug", temp3);
                if (temp3[0].owning_access_group == "CBS") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        cbs[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        cbs[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        cbs[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        cbs[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        cbs[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        cbs[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        cbs[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "DISTRIBUTION") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        distribution[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        distribution[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        distribution[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        distribution[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        distribution[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        distribution[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        distribution[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "ES-D") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        esd[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        esd[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        esd[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        esd[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        esd[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        esd[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        esd[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "FLEET") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        fleet[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        fleet[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        fleet[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        fleet[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        fleet[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        fleet[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        fleet[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "LAND") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        land[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        land[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        land[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        land[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        land[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        land[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        land[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "NRW") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        nrw[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        nrw[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        nrw[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        nrw[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        nrw[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        nrw[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        nrw[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "PD-N") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        pdn[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        pdn[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        pdn[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        pdn[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        pdn[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        pdn[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        pdn[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "PD-S") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        pds[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        pds[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        pds[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        pds[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        pds[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        pds[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        pds[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "SCADA") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        scada[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        scada[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        scada[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        scada[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        scada[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        scada[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        scada[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "WQ") {
                    _this.totalAssetMaintenance += temp[j].asset_location_asset_list.length;
                    if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
                        wq[0].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
                        wq[1].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
                        wq[2].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "FLEET COMPLIANCE") {
                        wq[3].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "INSTALLATION TESTING AND COM") {
                        wq[4].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "RETIRE") {
                        wq[5].total += temp[j].asset_location_asset_list.length;
                    }
                    else if (temp[j].field_1 == "UPGRADE") {
                        wq[6].total += temp[j].asset_location_asset_list.length;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                console.log("cbs", cbs);
                console.log("dist", distribution);
                console.log("esd", esd);
                console.log("fleet", fleet);
                console.log("land", land);
                console.log("nrw", nrw);
                console.log("pdn", pdn);
                console.log("pds", pds);
                console.log("scada", scada);
                console.log("wq", wq);
                _this.CBS = cbs;
                _this.DISTRIBUTION = distribution;
                _this.ESD = esd;
                _this.FLEET = fleet;
                _this.LAND = land;
                _this.NRW = nrw;
                _this.PDN = pdn;
                _this.PDS = pds;
                _this.SCADA = scada;
                _this.WQ = wq;
                _this.initPieOne();
                _this.initPieTwo();
                _this.initPieThree();
                _this.initPieFour();
                _this.initPieFive();
                _this.initPieSix();
                _this.initPieSeven();
                _this.initPieEight();
                _this.initPieNine();
                _this.initPieTen();
                // this.chartData = data;
                // console.log("Chartdata", this.chartData);
                // this.initPieTwo();
                _this.SpinnerService.hide();
            }, function (error) {
                console.log('Error is ', error);
            });
        };
        var this_1 = this;
        for (var j in temp) {
            _loop_1(j);
        }
    };
    AnalyticsTamComponent.prototype.filter = function () {
        var _this = this;
        var temp = [];
        var temp2 = [];
        this.workOrderActivityCompletionService.get().subscribe(function (response) {
            // temp = response
            // console.log("temp", temp)
            console.log("asset_owning", _this.asset_owning);
            console.log("response", response);
            if (_this.asset_owning != null && _this.selected_date == null) {
                temp = response.filter(function (value) { return value.owning_organization.includes(_this.asset_owning); });
                console.log("temp", temp);
                temp2 = temp;
            }
            else if (_this.asset_owning == null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                console.log("from 2", Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(from, 'yyyy-MM-dd', 'en_US'));
                console.log("to 2", Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'));
                temp = response;
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(to, 'yyyy-MM-dd', 'en_US')) {
                        console.log("data" + i, Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US'));
                        temp2.push(temp[i]);
                    }
                }
            }
            else if (_this.asset_owning != null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                temp = response.filter(function (value) { return value.owning_organization.includes(_this.asset_owning); });
                console.log("temp", temp);
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
            }
            console.log("temp2", temp2);
            console.log("temp2 length", temp2.length);
            // this.assets = temp2
            // console.log('assets', this.assets);
            // this.totalWorkOrder = temp2.length
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsTamComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.initPieOne();
            _this.initPieTwo();
            _this.initPieThree();
            _this.initPieFour();
            _this.initPieFive();
            _this.initPieSix();
            _this.initPieSeven();
            _this.initPieEight();
            _this.initPieNine();
            _this.initPieTen();
        });
    };
    AnalyticsTamComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.pieone)
                _this.pieone.dispose();
            if (_this.pietwo)
                _this.pietwo.dispose();
            if (_this.piethree)
                _this.piethree.dispose();
            if (_this.piefour)
                _this.piefour.dispose();
            if (_this.piefive)
                _this.piefive.dispose();
            if (_this.piesix)
                _this.piesix.dispose();
            if (_this.pieseven)
                _this.pieseven.dispose();
            if (_this.pieeight)
                _this.pieeight.dispose();
            if (_this.pienine)
                _this.pienine.dispose();
            if (_this.pieten)
                _this.pieten.dispose();
        });
    };
    AnalyticsTamComponent.prototype.initPieOne = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivone", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.CBS;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pieone = chart;
    };
    AnalyticsTamComponent.prototype.initPieTwo = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivtwo", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.DISTRIBUTION;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pietwo = chart;
    };
    AnalyticsTamComponent.prototype.initPieThree = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivthree", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.ESD;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.piethree = chart;
    };
    AnalyticsTamComponent.prototype.initPieFour = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivfour", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.FLEET;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.piefour = chart;
    };
    AnalyticsTamComponent.prototype.initPieFive = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivfive", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.LAND;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.piefive = chart;
    };
    AnalyticsTamComponent.prototype.initPieSix = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivsix", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.NRW;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.piesix = chart;
    };
    AnalyticsTamComponent.prototype.initPieSeven = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivseven", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.PDN;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pieseven = chart;
    };
    AnalyticsTamComponent.prototype.initPieEight = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piediveight", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.PDS;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pieeight = chart;
    };
    AnalyticsTamComponent.prototype.initPieNine = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivnine", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.SCADA;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pienine = chart;
    };
    AnalyticsTamComponent.prototype.initPieTen = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("piedivten", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart3D"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.WQ;
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        // chart.depth = 120;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries3D"]());
        series.dataFields.value = "total";
        // series.dataFields.depthValue = "total";
        series.dataFields.category = "type";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value}";
        series.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](-40);
        series.labels.template.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("white");
        series.slices.template.propertyFields.fill = "color";
        this.pieten = chart;
    };
    AnalyticsTamComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"] },
        { type: src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__["WorkOrderActivityCompletionService"] },
        { type: src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_8__["WorkOrderActivityCompletionAssetLocationAssetListService"] },
        { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"] }
    ]; };
    AnalyticsTamComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-analytics-tam",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics-tam.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics-tam.component.scss */ "./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"],
            src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_7__["WorkOrderActivityCompletionService"],
            src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_8__["WorkOrderActivityCompletionAssetLocationAssetListService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"]])
    ], AnalyticsTamComponent);
    return AnalyticsTamComponent;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvYW5hbHl0aWNzLXRhci9hbmFseXRpY3MtdGFyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.ts ***!
  \******************************************************************************/
/*! exports provided: AnalyticsTarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsTarComponent", function() { return AnalyticsTarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var src_app_shared_services_analytic_tar_analytic_tar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/services/analytic-tar/analytic-tar.service */ "./src/app/shared/services/analytic-tar/analytic-tar.service.ts");










_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
var AnalyticsTarComponent = /** @class */ (function () {
    function AnalyticsTarComponent(zone, assetsService, SpinnerService, tarService) {
        this.zone = zone;
        this.assetsService = assetsService;
        this.SpinnerService = SpinnerService;
        this.tarService = tarService;
        this.asset_registered_length = 0;
        this.assetRegistration = [];
        // selected_date: any;
        this.dateToday = new Date();
        this.assetowningdepartment = [
            { value: "CBS", name: "CUSTOMER BILLING SERVICES" },
            { value: "DISTRIBUTION", name: "DISTRIBUTION" },
            { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
            { value: "FLEET", name: "FLEET" },
            { value: "LAND", name: "LAND" },
            { value: "NRW", name: "NRW" },
            { value: "PD-N", name: "PRODUCTION NORTHERN" },
            { value: "PD-S", name: "PRODUCTION SOUTHERN" },
            { value: "SCADA", name: "SCADA" },
            { value: "WQ", name: "WATER QUALITY" },
        ];
        this.currentDate = true;
        this.filteredDate = false;
    }
    AnalyticsTarComponent.prototype.ngOnInit = function () {
        this.getTAR();
        this.getAssetRegistered();
        // this.initChartTwo();
    };
    AnalyticsTarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.initChartTwo();
        });
    };
    AnalyticsTarComponent.prototype.ngAfterViewChecked = function () {
        // if date range not empty 
        // call api and slice data between range
    };
    AnalyticsTarComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.charttwo)
                _this.charttwo.dispose();
        });
    };
    AnalyticsTarComponent.prototype.getTAR = function () {
        var _this = this;
        this.tarService.get().subscribe(function (res) {
            console.log("TARSER", res);
            _this.chartData = res;
            _this.initChartTwo();
            // this.chartData = [
            //   { title: "CBS", total: 0, },
            //   { title: "DISTRIBUTION", total: 0, },
            //   { title: "ES-D", total: 0, },
            //   { title: "FLEET", total: 0, },
            //   { title: "LAND", total: 0, },
            //   { title: "NRW", total: 0, },
            //   { title: "PD-N", total: 0, },
            //   { title: "PD-S", total: 0, },
            //   { title: "SCADA", total: 0, },
            //   { title: "WQ", total: 0, },
            // ];
            // this.chartData[0].total = res["CBS"]
            // this.chartData[1].total = res["DISTRIBUTION"]
            // this.chartData[2].total = res["ES-D"]
            // this.chartData[3].total = res["FLEET"]
            // this.chartData[4].total = res["LAND"]
            // this.chartData[5].total = res["NRW"]
            // this.chartData[6].total = res["PD-N"]
            // this.chartData[7].total = res["PD-S"]
            // this.chartData[8].total = res["SCADA"]
            // this.chartData[9].total = res["WQ"]
            console.log("chartData", _this.chartData);
        }, function (err) {
        });
    };
    AnalyticsTarComponent.prototype.getAssetRegistered = function () {
        var _this = this;
        // this.SpinnerService.show();
        this.currentDate = true;
        this.filteredDate = false;
        this.assetsService.get().subscribe(function (res) {
            console.log("Resss", res);
            _this.assets = res;
            _this.asset_registered_length = res.length;
            _this.getChartdata();
            // this.SpinnerService.hide();
        }, function (err) {
        });
    };
    AnalyticsTarComponent.prototype.filter = function () {
        var _this = this;
        console.log("asset_owning", this.asset_owning);
        var temp = [];
        var temp2 = [];
        // for (let i in this.assets){
        // }
        this.SpinnerService.show();
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x) { return x.filter(function (i) { return i.registered_datetime != null; }); })).subscribe(function (response) {
            // temp = response
            // console.log("temp", temp)
            if (_this.asset_owning != null && _this.selected_date == null) {
                temp = response.filter(function (value) { return value.owning_access_group.includes(_this.asset_owning); });
                console.log("temp", temp);
                temp2 = temp;
            }
            else if (_this.asset_owning == null && _this.selected_date != null) {
                _this.fromDate = _this.selected_date[0];
                _this.toDate = _this.selected_date[1];
                console.log("from", _this.fromDate);
                console.log("to", _this.toDate);
                temp = response;
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.fromDate, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.toDate, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
                _this.currentDate = false;
                _this.filteredDate = true;
            }
            else if (_this.asset_owning != null && _this.selected_date != null) {
                _this.fromDate = _this.selected_date[0];
                _this.toDate = _this.selected_date[1];
                console.log("from", _this.fromDate);
                console.log("to", _this.toDate);
                temp = response.filter(function (value) { return value.owning_access_group.includes(_this.asset_owning); });
                console.log("temp", temp);
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.fromDate, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(_this.toDate, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
                _this.currentDate = false;
                _this.filteredDate = true;
            }
            console.log("temp2", temp2);
            console.log("temp2 length", temp2.length);
            _this.assets = temp2;
            _this.asset_registered_length = _this.assets.length;
            console.log('assets', _this.assets);
            _this.getChartdata();
            // this.initChartTwo();
            console.log("filtered chartdata", _this.chartData);
            // this.initChartTwo();
            _this.SpinnerService.hide();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    // 
    AnalyticsTarComponent.prototype.getChartdata = function () {
        this.chartData = [
            { title: "CBS", total: 0, },
            { title: "DISTRIBUTION", total: 0, },
            { title: "ES-D", total: 0, },
            { title: "FLEET", total: 0, },
            { title: "LAND", total: 0, },
            { title: "NRW", total: 0, },
            { title: "PD-N", total: 0, },
            { title: "PD-S", total: 0, },
            { title: "SCADA", total: 0, },
            { title: "WQ", total: 0, },
        ];
        for (var i in this.assets) {
            if (this.assets[i].owning_access_group == "CBS") {
                this.chartData[0].total += 1;
            }
            else if (this.assets[i].owning_access_group == "DISTRIBUTION") {
                this.chartData[1].total += 1;
            }
            else if (this.assets[i].owning_access_group == "ES-D") {
                this.chartData[2].total += 1;
            }
            else if (this.assets[i].owning_access_group == "FLEET") {
                this.chartData[3].total += 1;
            }
            else if (this.assets[i].owning_access_group == "LAND") {
                this.chartData[4].total += 1;
            }
            else if (this.assets[i].owning_access_group == "NRW") {
                this.chartData[5].total += 1;
            }
            else if (this.assets[i].owning_access_group == "PD-N") {
                this.chartData[6].total += 1;
            }
            else if (this.assets[i].owning_access_group == "PD-S") {
                this.chartData[7].total += 1;
            }
            else if (this.assets[i].owning_access_group == "SCADA") {
                this.chartData[8].total += 1;
            }
            else if (this.assets[i].owning_access_group == "WQ") {
                this.chartData[9].total += 1;
            }
        }
        console.log("chartdata", this.chartData);
        this.initChartTwo();
    };
    AnalyticsTarComponent.prototype.initChartTwo = function () {
        _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
        // Create chart instance
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("chartdivtwo", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYChart"]);
        chart.paddingBottom = 50;
        chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYCursor"]();
        chart.scrollbarX = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["Scrollbar"]();
        // Modify chart's colors
        chart.colors.list = [
            _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#809fd5"),
        ];
        // Add data
        chart.data = this.chartData;
        console.log("this.chartData 3", this.chartData);
        // Create axes
        var categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["CategoryAxis"]());
        categoryAxis.dataFields.category = "title";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index && 2 == 2) {
                return dy + 25;
            }
            return dy;
        });
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ValueAxis"]());
        // Create series
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ColumnSeries"]());
        series.dataFields.valueY = "total";
        series.dataFields.categoryX = "title";
        series.name = "Totals";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        this.charttwo = chart;
    };
    AnalyticsTarComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"] },
        { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"] },
        { type: src_app_shared_services_analytic_tar_analytic_tar_service__WEBPACK_IMPORTED_MODULE_9__["TarService"] }
    ]; };
    AnalyticsTarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-analytics-tar',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics-tar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics-tar.component.scss */ "./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"],
            src_app_shared_services_analytic_tar_analytic_tar_service__WEBPACK_IMPORTED_MODULE_9__["TarService"]])
    ], AnalyticsTarComponent);
    return AnalyticsTarComponent;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvYW5hbHl0aWNzLXdhL2FuYWx5dGljcy13YS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.ts ***!
  \****************************************************************************/
/*! exports provided: AnalyticsWaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsWaComponent", function() { return AnalyticsWaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service */ "./src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service.ts");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service */ "./src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service.ts");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");











_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_7__["default"]);
var AnalyticsWaComponent = /** @class */ (function () {
    function AnalyticsWaComponent(zone, workOrderActivityCompletionService, assetsService, WOACALALS, SpinnerService) {
        this.zone = zone;
        this.workOrderActivityCompletionService = workOrderActivityCompletionService;
        this.assetsService = assetsService;
        this.WOACALALS = WOACALALS;
        this.SpinnerService = SpinnerService;
        this.assetowningdepartment = [
            { value: "CBS", name: "CUSTOMER BILLING SERVICES" },
            { value: "DISTRIBUTION", name: "DISTRIBUTION" },
            { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
            { value: "FLEET", name: "FLEET" },
            { value: "LAND", name: "LAND" },
            { value: "NRW", name: "NRW" },
            { value: "PD-N", name: "PRODUCTION NORTHERN" },
            { value: "PD-S", name: "PRODUCTION SOUTHERN" },
            { value: "SCADA", name: "SCADA" },
            { value: "WQ", name: "WATER QUALITY" },
        ];
    }
    AnalyticsWaComponent.prototype.ngOnInit = function () {
        // this.getWorkOrderActivity();
        this.getAssets();
    };
    AnalyticsWaComponent.prototype.getWorkOrderActivity = function () {
        var _this = this;
        // let temp = []
        this.workOrderActivityCompletionService.get().subscribe(function (response) {
            console.log('response from API is ', response);
            _this.WorkOrderActivity = response;
            console.log("WorkOrderActivity", _this.WorkOrderActivity);
            _this.getTotalWorkOrder();
            // this.updateFilter();
            _this.getTotalBackLog();
            _this.getChartData();
            // this.initChartOne();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsWaComponent.prototype.getTotalBackLog = function () {
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        console.log("today", today);
        console.log("yesterday", yesterday);
        var yesterdayBacklog = [];
        this.backLog = this.WorkOrderActivity.filter(function (value) { return value.status.includes("BackLog"); });
        console.log("BackLog", this.backLog);
        for (var i in this.backLog) {
            var filteredData = Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(today, 'yyyy-MM-dd', 'en_US');
            console.log("filtered backlog", filteredData);
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(today, 'yyyy-MM-dd', 'en_US'))
                yesterdayBacklog[i] = this.backLog[i];
            // if (formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(this.yesterday, 'yyyy-MM-dd', 'en_US'))
            //   yesterdayBacklog[i] = this.backLog[i]
        }
        console.log("yesterday BackLog", yesterdayBacklog);
        this.totalBackLogToday = this.backLog.length;
        this.totalBackLogYesterday = yesterdayBacklog.length;
        var totalActivity = this.WorkOrderActivity.length;
        console.log("Today", this.totalBackLogToday);
        console.log("yesterday", this.totalBackLogYesterday);
        this.backLogPercentageToday = ((this.totalBackLogToday / totalActivity) * 100).toFixed(2);
        this.backLogPercentageYesterday = ((this.totalBackLogYesterday / totalActivity) * 100).toFixed(2);
    };
    AnalyticsWaComponent.prototype.getTotalWorkOrder = function () {
        this.totalWorkOrder = this.WorkOrderActivity.length;
        this.tempTotalWorkOrder = this.WorkOrderActivity.length;
        console.log("Total work order", this.totalWorkOrder);
        console.log("Temp Total work order", this.tempTotalWorkOrder);
    };
    AnalyticsWaComponent.prototype.getChartData = function () {
        var _this = this;
        var data = [
            { category: "CBS", backLog: 0, inprogress: 0, new: 0 },
            { category: "DISTRIBUTION", backLog: 0, inprogress: 0, new: 0 },
            { category: "ES-D", backLog: 0, inprogress: 0, new: 0 },
            { category: "FLEET", backLog: 0, inprogress: 0, new: 0 },
            { category: "LAND", backLog: 0, inprogress: 0, new: 0 },
            { category: "NRW", backLog: 0, inprogress: 0, new: 0 },
            { category: "PD-N", backLog: 0, inprogress: 0, new: 0 },
            { category: "PD-S", backLog: 0, inprogress: 0, new: 0 },
            { category: "SCADA", backLog: 0, inprogress: 0, new: 0 },
            { category: "WQ", backLog: 0, inprogress: 0, new: 0 },
        ];
        var temp = this.WorkOrderActivity;
        var temp2;
        var temp3;
        var test = [];
        console.log("temp", temp);
        var _loop_1 = function (j) {
            console.log("id : ", temp[j].asset_location_asset_list[0]);
            this_1.WOACALALS.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (x) { return x.filter(function (i) { return i.id == temp[j].asset_location_asset_list[0]; }); })).subscribe(function (response) {
                console.log('response from API is ', response);
                temp2 = response;
                console.log("temp2", temp2);
                temp3 = _this.assets.filter(function (value) { return value.asset_id.includes(temp2[0].asset_id); });
                console.log("temp3 debug", temp3);
                console.log("owning org", temp3[0].owning_access_group);
                if (temp3[0].owning_access_group == "CBS") {
                    if (temp[j].status == "BackLog") {
                        data[0].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[0].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[0].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "DISTRIBUTION") {
                    if (temp[j].status == "BackLog") {
                        data[1].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[1].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[1].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "ES-D") {
                    if (temp[j].status == "BackLog") {
                        data[2].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[2].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[2].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "FLEET") {
                    // data[3].backLog += 1;
                    if (temp[j].status == "BackLog") {
                        data[3].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[3].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[3].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "LAND") {
                    if (temp[j].status == "BackLog") {
                        data[4].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[4].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[4].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "NRW") {
                    if (temp[j].status == "BackLog") {
                        data[5].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[5].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[5].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "PD-N") {
                    if (temp[j].status == "BackLog") {
                        data[6].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[6].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[6].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "PD-S") {
                    if (temp[j].status == "BackLog") {
                        data[7].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[7].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[7].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "SCADA") {
                    if (temp[j].status == "BackLog") {
                        data[8].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[8].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[8].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else if (temp3[0].owning_access_group == "WQ") {
                    if (temp[j].status == "BackLog") {
                        data[9].backLog += 1;
                    }
                    else if (temp[j].status == "InProgress") {
                        data[9].inprogress += 1;
                    }
                    else if (temp[j].status == "New") {
                        data[9].new += 1;
                    }
                    else {
                        console.log("Failed ", temp3[0].owning_access_group);
                    }
                }
                else {
                    console.log("Failed ", temp3[0].owning_access_group);
                }
                console.log("data", data);
                _this.chartData = data;
                console.log("Chartdata", _this.chartData);
                console.log("test", test);
                _this.initChartOne();
            }, function (error) {
                console.log('Error is ', error);
            });
        };
        var this_1 = this;
        for (var j in temp) {
            _loop_1(j);
        }
    };
    AnalyticsWaComponent.prototype.getAssets = function () {
        var _this = this;
        this.SpinnerService.show();
        this.assetsService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (x) { return x.filter(function (i) { return i.owning_access_group != ""; }); })).subscribe(function (response) {
            console.log('response from API is ', response);
            _this.assets = response;
            console.log('assets', _this.assets);
            _this.getWorkOrderActivity();
            _this.SpinnerService.hide();
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsWaComponent.prototype.filter = function () {
        var _this = this;
        var temp = [];
        var temp2 = [];
        this.workOrderActivityCompletionService.get().subscribe(function (response) {
            // temp = response
            // console.log("temp", temp)
            console.log("asset_owning", _this.asset_owning);
            console.log("response", response);
            if (_this.asset_owning != null && _this.selected_date == null) {
                temp = response.filter(function (value) { return value.owning_organization.includes(_this.asset_owning); });
                console.log("temp", temp);
                temp2 = temp;
            }
            else if (_this.asset_owning == null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                console.log("from 2", Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(from, 'yyyy-MM-dd', 'en_US'));
                console.log("to 2", Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'));
                temp = response;
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(to, 'yyyy-MM-dd', 'en_US')) {
                        console.log("data" + i, Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US'));
                        temp2.push(temp[i]);
                    }
                }
            }
            else if (_this.asset_owning != null && _this.selected_date != null) {
                var from = _this.selected_date[0];
                var to = _this.selected_date[1];
                console.log("from", from);
                console.log("to", to);
                temp = response.filter(function (value) { return value.owning_organization.includes(_this.asset_owning); });
                console.log("temp", temp);
                for (var i in temp) {
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(from, 'yyyy-MM-dd', 'en_US') && Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["formatDate"])(to, 'yyyy-MM-dd', 'en_US'))
                        temp2.push(temp[i]);
                }
            }
            console.log("temp2", temp2);
            console.log("temp2 length", temp2.length);
            // this.assets = temp2
            // console.log('assets', this.assets);
            _this.totalWorkOrder = temp2.length;
        }, function (error) {
            console.log('Error is ', error);
        });
    };
    AnalyticsWaComponent.prototype.reset = function () {
        this.totalWorkOrder = this.WorkOrderActivity.length;
    };
    AnalyticsWaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.initChartOne();
        });
    };
    AnalyticsWaComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chartone)
                _this.chartone.dispose();
        });
    };
    AnalyticsWaComponent.prototype.initChartOne = function () {
        // Themes begin
        _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_7__["default"]);
        // Themes end
        // Create chart instance
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["create"]("chartdivone", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["XYChart"]);
        // Add data
        chart.data = this.chartData;
        // Create axes
        var categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["CategoryAxis"]());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["ValueAxis"]());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;
        valueAxis.calculateTotals = true;
        // Modify chart's colors
        chart.colors.list = [
            _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["color"]("#f5365b"),
            _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["color"]("#fed602"),
            _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["color"]("#2bce89"),
        ];
        // Create series
        function createSeries(field, name) {
            // Set up series
            var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["ColumnSeries"]());
            series.name = name;
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.sequencedInterpolation = true;
            // Make it stacked
            series.stacked = true;
            // Configure columns
            series.columns.template.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["percent"](60);
            series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
            // Add label
            var labelBullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["LabelBullet"]());
            labelBullet.label.text = "{valueY}";
            labelBullet.label.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["color"]("#fff");
            labelBullet.locationY = 0.5;
            labelBullet.label.hideOversized = true;
            return series;
        }
        createSeries("backLog", "BackLog");
        createSeries("inprogress", "Active");
        createSeries("new", "New");
        // Create series for total
        var totalSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["ColumnSeries"]());
        totalSeries.dataFields.valueY = "none";
        totalSeries.dataFields.categoryX = "category";
        totalSeries.stacked = true;
        totalSeries.hiddenInLegend = true;
        totalSeries.columns.template.strokeOpacity = 0;
        var totalBullet = totalSeries.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["LabelBullet"]());
        totalBullet.dy = -20;
        totalBullet.label.text = "{valueY.total}";
        totalBullet.label.hideOversized = false;
        totalBullet.label.fontSize = 18;
        totalBullet.label.background.fill = totalSeries.stroke;
        totalBullet.label.background.fillOpacity = 0.2;
        totalBullet.label.padding(5, 10, 5, 10);
        totalBullet.label.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_5__["color"]("#000000");
        valueAxis.extraMax = 0.1;
        valueAxis.calculateTotals = true;
        // Legend
        chart.legend = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_6__["Legend"]();
        this.chartone = chart;
    };
    AnalyticsWaComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_2__["WorkOrderActivityCompletionService"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_3__["AssetsService"] },
        { type: src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_4__["WorkOrderActivityCompletionAssetLocationAssetListService"] },
        { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_10__["NgxSpinnerService"] }
    ]; };
    AnalyticsWaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-analytics-wa',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics-wa.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics-wa.component.scss */ "./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            src_app_shared_services_work_order_activity_completion_work_order_activity_completion_service__WEBPACK_IMPORTED_MODULE_2__["WorkOrderActivityCompletionService"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_3__["AssetsService"],
            src_app_shared_services_WorkOrderActivityCompletionAssetLocationAssetList_WorkOrderActivityCompletionAssetLocationAssetList_service__WEBPACK_IMPORTED_MODULE_4__["WorkOrderActivityCompletionAssetLocationAssetListService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_10__["NgxSpinnerService"]])
    ], AnalyticsWaComponent);
    return AnalyticsWaComponent;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/analytics/analytics.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics/analytics.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvYW5hbHl0aWNzL2FuYWx5dGljcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/admin/big-data/analytics/analytics.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/core/admin/big-data/analytics/analytics.component.ts ***!
  \**********************************************************************/
/*! exports provided: AnalyticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsComponent", function() { return AnalyticsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/material */ "./node_modules/@amcharts/amcharts4/themes/material.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");






_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_material__WEBPACK_IMPORTED_MODULE_4__["default"]);
_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_5__["default"]);
var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent(zone) {
        this.zone = zone;
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.initChart();
            _this.initChart1();
        });
    };
    AnalyticsComponent.prototype.ngOnDestroy = function () {
        if (this.chartOne) {
            this.chartOne.dispose();
        }
        if (this.chartTwo) {
            this.chartTwo.dispose();
        }
    };
    AnalyticsComponent.prototype.initChart = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("chartdiv", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYChart"]);
        // Add data
        chart.data = [
            {
                month: "Jan",
                asset1: 2.5,
                asset2: 2.5,
                asset3: 2.1,
                asset4: 0.3,
                asset5: 0.2,
            },
            {
                month: "Feb",
                asset1: 2.6,
                asset2: 2.7,
                asset3: 2.2,
                asset4: 0.3,
                asset5: 0.3,
            },
            {
                month: "Mac",
                asset1: 2.8,
                asset2: 2.9,
                asset3: 2.4,
                asset4: 0.3,
                asset5: 0.3,
            },
        ];
        chart.legend = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["Legend"]();
        chart.legend.position = "top";
        // Create axes
        var categoryAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["CategoryAxis"]());
        categoryAxis.dataFields.category = "month";
        categoryAxis.renderer.grid.template.opacity = 0;
        var valueAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ValueAxis"]());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.opacity = 0;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
        valueAxis.renderer.ticks.template.stroke = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#495C43");
        valueAxis.renderer.ticks.template.length = 10;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.minGridDistance = 40;
        // Create series
        function createSeries(field, name) {
            var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ColumnSeries"]());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "month";
            series.stacked = true;
            series.name = name;
            var labelBullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["LabelBullet"]());
            labelBullet.locationX = 0.5;
            labelBullet.label.text = "{valueX}";
            labelBullet.label.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#fff");
        }
        createSeries("asset1", "Asset 1");
        createSeries("asset2", "Asset 2");
        createSeries("asset3", "Asset 3");
        createSeries("asset4", "Asset 4");
        createSeries("asset5", "Asset 5");
        this.chartOne = chart;
    };
    AnalyticsComponent.prototype.initChart1 = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("chartdiv1", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart"]);
        // Add data
        chart.data = [
            {
                maintenance: "Preventive",
                amount: 501,
            },
            {
                maintenance: "Pending",
                amount: 301,
            },
            {
                maintenance: "Delayed",
                amount: 201,
            },
        ];
        // Set inner radius
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](20);
        // Set radius
        chart.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](35);
        // Add and configure Series
        var pieSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries"]());
        pieSeries.dataFields.value = "amount";
        pieSeries.dataFields.category = "maintenance";
        pieSeries.slices.template.stroke = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["color"]("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
        this.chartTwo = chart;
    };
    AnalyticsComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    AnalyticsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-analytics",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/analytics/analytics.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics.component.scss */ "./src/app/core/admin/big-data/analytics/analytics.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/big-data.module.ts":
/*!********************************************************!*\
  !*** ./src/app/core/admin/big-data/big-data.module.ts ***!
  \********************************************************/
/*! exports provided: BigDataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigDataModule", function() { return BigDataModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @asymmetrik/ngx-leaflet */ "./node_modules/@asymmetrik/ngx-leaflet/dist/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _big_data_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./big-data.routing */ "./src/app/core/admin/big-data/big-data.routing.ts");
/* harmony import */ var _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./analytics/analytics.component */ "./src/app/core/admin/big-data/analytics/analytics.component.ts");
/* harmony import */ var _tableau_tableau_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tableau/tableau.component */ "./src/app/core/admin/big-data/tableau/tableau.component.ts");
/* harmony import */ var _analytics_tar_analytics_tar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./analytics-tar/analytics-tar.component */ "./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.ts");
/* harmony import */ var _analytics_wa_analytics_wa_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./analytics-wa/analytics-wa.component */ "./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.ts");
/* harmony import */ var _analytics_acs_analytics_acs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./analytics-acs/analytics-acs.component */ "./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.ts");
/* harmony import */ var _analytics_tam_analytics_tam_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./analytics-tam/analytics-tam.component */ "./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");



















var BigDataModule = /** @class */ (function () {
    function BigDataModule() {
    }
    BigDataModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_12__["AnalyticsComponent"],
                _tableau_tableau_component__WEBPACK_IMPORTED_MODULE_13__["TableauComponent"],
                _analytics_tar_analytics_tar_component__WEBPACK_IMPORTED_MODULE_14__["AnalyticsTarComponent"],
                _analytics_wa_analytics_wa_component__WEBPACK_IMPORTED_MODULE_15__["AnalyticsWaComponent"],
                _analytics_acs_analytics_acs_component__WEBPACK_IMPORTED_MODULE_16__["AnalyticsAcsComponent"],
                _analytics_tam_analytics_tam_component__WEBPACK_IMPORTED_MODULE_17__["AnalyticsTamComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDropdownModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ProgressbarModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["TooltipModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(_big_data_routing__WEBPACK_IMPORTED_MODULE_11__["BigDataRoutes"]),
                _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_9__["LeafletModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalModule"].forRoot(),
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_6__["MatStepperModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PopoverModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["RatingModule"].forRoot(),
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["NgxDatatableModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_18__["NgxSpinnerModule"]
            ]
        })
    ], BigDataModule);
    return BigDataModule;
}());



/***/ }),

/***/ "./src/app/core/admin/big-data/big-data.routing.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/admin/big-data/big-data.routing.ts ***!
  \*********************************************************/
/*! exports provided: BigDataRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigDataRoutes", function() { return BigDataRoutes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tableau_tableau_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tableau/tableau.component */ "./src/app/core/admin/big-data/tableau/tableau.component.ts");
/* harmony import */ var _analytics_wa_analytics_wa_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analytics-wa/analytics-wa.component */ "./src/app/core/admin/big-data/analytics-wa/analytics-wa.component.ts");
/* harmony import */ var _analytics_tar_analytics_tar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analytics-tar/analytics-tar.component */ "./src/app/core/admin/big-data/analytics-tar/analytics-tar.component.ts");
/* harmony import */ var _analytics_acs_analytics_acs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./analytics-acs/analytics-acs.component */ "./src/app/core/admin/big-data/analytics-acs/analytics-acs.component.ts");
/* harmony import */ var _analytics_tam_analytics_tam_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analytics-tam/analytics-tam.component */ "./src/app/core/admin/big-data/analytics-tam/analytics-tam.component.ts");






var BigDataRoutes = [
    {
        path: "",
        children: [
            // {
            //     path: 'analytics',
            //     component: AnalyticsComponent
            // },
            {
                path: "tableau",
                component: _tableau_tableau_component__WEBPACK_IMPORTED_MODULE_1__["TableauComponent"],
            },
            {
                path: "",
                children: [
                    {
                        path: "work-activity",
                        component: _analytics_wa_analytics_wa_component__WEBPACK_IMPORTED_MODULE_2__["AnalyticsWaComponent"],
                    },
                    {
                        path: "total-asset-registered",
                        component: _analytics_tar_analytics_tar_component__WEBPACK_IMPORTED_MODULE_3__["AnalyticsTarComponent"],
                    },
                    {
                        path: "asset-condition-score",
                        component: _analytics_acs_analytics_acs_component__WEBPACK_IMPORTED_MODULE_4__["AnalyticsAcsComponent"],
                    },
                    {
                        path: "total-asset-maintenance",
                        component: _analytics_tam_analytics_tam_component__WEBPACK_IMPORTED_MODULE_5__["AnalyticsTamComponent"],
                    },
                ],
            },
        ],
    },
];


/***/ }),

/***/ "./src/app/core/admin/big-data/tableau/tableau.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/core/admin/big-data/tableau/tableau.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvYWRtaW4vYmlnLWRhdGEvdGFibGVhdS90YWJsZWF1LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/admin/big-data/tableau/tableau.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/admin/big-data/tableau/tableau.component.ts ***!
  \******************************************************************/
/*! exports provided: TableauComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableauComponent", function() { return TableauComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TableauComponent = /** @class */ (function () {
    function TableauComponent(zone) {
        this.zone = zone;
    }
    TableauComponent.prototype.ngOnInit = function () { };
    TableauComponent.prototype.ngAfterViewInit = function () {
        this.initTableauOne();
        this.initTableauTwo();
    };
    TableauComponent.prototype.initTableauOne = function () {
        var placeholderDiv = document.getElementById("vizContainerOne");
        // Replace this url with the url of your Tableau dashboard
        var url = "https://public.tableau.com/views/testing_15890862200980/DashboardMovement?:display_count=y&:origin=viz_share_link";
        var options = {
            hideTabs: true,
            width: "80%",
            height: "600px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            },
        };
        // Creating a viz object and embed it in the container div.
        this.vizOne = new tableau.Viz(placeholderDiv, url, options);
    };
    TableauComponent.prototype.initTableauTwo = function () {
        var placeholderDiv = document.getElementById("vizContainerTwo");
        // Replace this url with the url of your Tableau dashboard
        var url = "https://public.tableau.com/views/testing_15890862200980/DashboardStockValue?:display_count=y&:origin=viz_share_link";
        var options = {
            hideTabs: true,
            width: "80%",
            height: "600px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            },
        };
        // Creating a viz object and embed it in the container div.
        this.vizTwo = new tableau.Viz(placeholderDiv, url, options);
    };
    TableauComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    TableauComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-tableau",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tableau.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/admin/big-data/tableau/tableau.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tableau.component.scss */ "./src/app/core/admin/big-data/tableau/tableau.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], TableauComponent);
    return TableauComponent;
}());



/***/ }),

/***/ "./src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service.ts ***!
  \************************************************************************************************************************************************/
/*! exports provided: WorkOrderActivityCompletionAssetLocationAssetListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderActivityCompletionAssetLocationAssetListService", function() { return WorkOrderActivityCompletionAssetLocationAssetListService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var WorkOrderActivityCompletionAssetLocationAssetListService = /** @class */ (function () {
    function WorkOrderActivityCompletionAssetLocationAssetListService(http) {
        this.http = http;
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/work-order-activity-completion-asset-location-asset-list/";
        // Data
        this.atmodels = [];
    }
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.atmodels = res;
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.getOne = function (id) {
        var _this = this;
        var urlID = this.url + id + "/";
        return this.http.get(urlID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.atmodel = res;
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.update = function (body) {
        return this.http.patch(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.delete = function (id) {
        return this.http.delete(this.url + id + "/").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.prototype.filter = function (field) {
        var urlFilter = this.url + "?" + field + "/";
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
        }));
    };
    WorkOrderActivityCompletionAssetLocationAssetListService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    WorkOrderActivityCompletionAssetLocationAssetListService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], WorkOrderActivityCompletionAssetLocationAssetListService);
    return WorkOrderActivityCompletionAssetLocationAssetListService;
}());



/***/ }),

/***/ "./src/app/shared/services/analytic-tar/analytic-tar.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/services/analytic-tar/analytic-tar.service.ts ***!
  \**********************************************************************/
/*! exports provided: TarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TarService", function() { return TarService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var TarService = /** @class */ (function () {
    function TarService(http) {
        this.http = http;
        //   url: string = environment.baseUrl + "v1/analytics/analytics_tar";
        this.url = "https://airsel-rfid.prototype.com.my/v1/analytics/analytics_tar/";
        //Data
        this.gmodels = [];
    }
    TarService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (res) {
            _this.gmodels = res;
        }));
    };
    TarService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    TarService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TarService);
    return TarService;
}());



/***/ })

}]);
//# sourceMappingURL=big-data-big-data-module.js.map