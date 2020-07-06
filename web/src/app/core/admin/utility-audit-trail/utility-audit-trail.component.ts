import { Component, OnInit } from '@angular/core';

import { AuditTrailData } from '../../../../assets/mock/utility';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-utility-audit-trail',
  templateUrl: './utility-audit-trail.component.html',
  styleUrls: ['./utility-audit-trail.component.scss']
})
export class UtilityAuditTrailComponent implements OnInit {

  // Data
  auditTrails

  // Table
  entries: number = 5
  selected: any[] = []
  temp = []
  activeRow: any
  rows: any = []

  SelectionType

  constructor() { 
    this.auditTrails = AuditTrailData
    this.rows = this.auditTrails
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    })
  }

  ngOnInit() {
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    })
  }

}
