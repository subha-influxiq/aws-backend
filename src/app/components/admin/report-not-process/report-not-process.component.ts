import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


/* Mat Table Start */
export interface TableInterface {
  file_original_name: any;
  doctor_name: any;
  tech_name: any;
  upload_time: any;
};

const MEMBER_DATA: TableInterface[] = [];
/* Table End */


@Component({
  selector: 'app-report-not-process',
  templateUrl: './report-not-process.component.html',
  styleUrls: ['./report-not-process.component.css']
})

export class ReportNotProcessComponent implements OnInit {

  public allResloveData: any = [];
  public allUserData_skip: any = ["doctor_id", "tech_id", "report_type", "status", "patientName", "_id", "patientName_search", "record", "billGenerationDate", "billSentDate", "superBill", "status_text", "note", "file_upload_server_id"];
  public editUrl: any = "admin/admin-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "phone": "Phone Number", "date": "Date",
    "status": "Status","address": "Address",
    "fullNamecopy": "Name"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public previewModal_skip : any=['_id','fullNamecopy'];
  public tableName: any = "users";
  public apiUrl: any;
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "users_view_admin";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;


  /****** New table allocation ******/
  displayedColumns: string[] = ['select', 'file_original_name', 'tech_name', 'doctor_name',
                              'upload_time', 'action'];
  dataSource = new MatTableDataSource(MEMBER_DATA);
  public reportData: any;
  selection = new SelectionModel<TableInterface>(true, []);
  /****** ******************** ******/

  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService,
    public httpService: HttpServiceService, private snackBar: MatSnackBar) {

    this.user_cookie = cookie.get('jwtToken');
    this.apiUrl = httpService.baseUrl;
    
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((resolveData) => {
      console.log("Data: ", resolveData.data);
      this.allResloveData = resolveData.data.res;
    });

    this.onPopulate();
  }


  onPopulate() {
    this.activatedRoute.data.forEach((resolveData) => {
      console.log("Data on populate: ", resolveData);
      this.reportData = resolveData.data.res;
      this.dataSource = new MatTableDataSource(this.reportData);
    });
  }

  deleteData(id) {
    console.log('id', id);

    this.httpService.ResolveViaPost({source: "patient_management", id: id }, "deletesingledata").subscribe((response: any) => {
      alert('Successfully deleted');
      //location.reload();
    });
  }

  retry(id) {
    console.log('id', id);
    this.httpService.httpViaPost("getPdfToImages", {id: id }).subscribe((response: any) => {
      this.openSnackBar("Retry ", response.status);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /****** Show snack bar ******/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

