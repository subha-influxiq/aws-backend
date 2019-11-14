import { Component, OnInit ,ViewChild} from '@angular/core';
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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
  {no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime:'adf', timeZone: 'fs',doctorName:'sfg', patientName: 'fgasd' , manage: '' },
];
