import { Component, OnInit ,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';


export interface PeriodicElement {
  no: number;
  organizerName: string;
  organizerEmail: string;
  appoinmentDate: string;
  appoinmentTime: string;
  timeZone: string;
  doctorName: string;
  patientName: string;
  manage: string;
}

@Component({
  selector: 'app-booked-appoinments',
  templateUrl: './booked-appoinments.component.html',
  styleUrls: ['./booked-appoinments.component.css']
})
export class BookedAppoinmentsComponent implements OnInit {
  public displayedColumns: string[] =
   ['no','organizerName', 'organizerEmail','appoinmentDate','appoinmentTime','timeZone','doctorName',
   'patientName','manage'];

   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    
  }
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
];