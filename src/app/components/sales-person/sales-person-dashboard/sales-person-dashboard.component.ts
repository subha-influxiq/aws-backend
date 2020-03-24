import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

const ELEMENT_DATA:any = [
  {no:'1', doctors_name: 'binay', email: 'Hydrogen', phone: 1.0079, NPI: 'H', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'badal', email: 'Helium', phone: 4.0026, NPI: 'He', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'dinesh', email: 'Lithium', phone: 6.941, NPI: 'Li', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'corona', email: 'Beryllium', phone: 9.0122, NPI: 'Be', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'Virus', email: 'Boron', phone: 10.811, NPI: 'B', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'came', email: 'Carbon', phone: 12.0107, NPI: 'C', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'gone', email: 'Nitrogen', phone: 14.0067, NPI: 'N', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'binay', email: 'Hydrogen', phone: 1.0079, NPI: 'H', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'badal', email: 'Helium', phone: 4.0026, NPI: 'He', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'dinesh', email: 'Lithium', phone: 6.941, NPI: 'Li', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'corona', email: 'Beryllium', phone: 9.0122, NPI: 'Be', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'Virus', email: 'Boron', phone: 10.811, NPI: 'B', addon:'10/10/2020', address:'corona home'},
  {no:'1', doctors_name: 'came', email: 'Carbon', phone: 12.0107, NPI: 'C', addon:'10/10/2020', address:'corona home'},

]

@Component({
  selector: 'app-sales-person-dashboard',
  templateUrl: './sales-person-dashboard.component.html',
  styleUrls: ['./sales-person-dashboard.component.css']
})
export class SalesPersonDashboardComponent implements OnInit {
  displayedColumns: string[] = [ 'no', 'doctors_name', 'email', 'phone', 'NPI', 'addon', 'address'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  pagination(status: any = null) {

  }

}
