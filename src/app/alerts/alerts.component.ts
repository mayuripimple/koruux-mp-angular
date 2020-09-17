import { Component, OnInit, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';

import { HttpClient } from '@angular/common/http';

import * as data from "../../assets/data.json";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  addrow: FormGroup;

  constructor(private http: HttpClient,private formBuilder: FormBuilder) {

     }

    colDefs = [
          {
            headerName: '',
            checkboxSelection: true
             },
             {
               headerName: 'Name',
                field: 'name',
                 sortable: true,
                 filter: true,

                },
             {
               headerName: 'Description',
                field: 'description',
                 sortable: true,
                 filter: true
               },

             {
               headerName: 'WebReference',
                field: 'webReference',
                 sortable: true,
                 filter: true
               },
         ];


  rowData: any;


  ngOnInit(): void {

    // get json file data into the grid
       this.rowData = data['data'];
       console.log(this.rowData);

       this.addrow = this.formBuilder.group({
         name: [''],
         description: [''],
         webReference: ['']

       });
   }

// delete selected row
   onDeleteRow()
   {
      var deleterow = this.agGrid.api.getSelectedRows();
      this.agGrid.api.updateRowData({ remove: deleterow });
   }

// form submit -add new row
   onSubmit()
   {
      if (this.addrow.invalid)
      {
         return;
      }
      console.log(this.addrow.value);

     this.agGrid.api.updateRowData({ add: [{ name: this.addrow.get('name').value, description: this.addrow.get('description').value, webReference: this.addrow.get('webReference').value }]
    });

  }
  
}
