import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public adminManagementAddEditForm:FormGroup;

  constructor( public fb: FormBuilder, private datePipe: DatePipe) {

    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');

    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
        this.adminManagementAddEditForm = fb.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', Validators.required],
          phoneno: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required],
          date: ['', Validators.required],
          status: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
          role: ['', Validators.required],
        })
  }

  ngOnInit() {
  }

}
