import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpServiceService} from "../../../services/http-service.service";

@Component({
  selector: 'app-past-appoinments',
  templateUrl: './past-appoinments.component.html',
  styleUrls: ['./past-appoinments.component.css']
})
export class PastAppoinmentsComponent implements OnInit {

  doctors: any;
  @Input()
  set searchByDoctorValues(searchByDoctorValues: any) {
    this.doctors = searchByDoctorValues;
    console.log('this.doctors', this.doctors);
  }

  // public searchByDoctor: any = {label: "Search By Doctor", field: 'doctor_id', values: []};

  public configData: any = {
    appName: 'Calendar Management',
    jwtToken: this.cookie.get('jwtToken'),
    baseUrl: environment.calendarApi,
    endPoint: {
      add: 'add-or-update-event-data',
      datalist: 'datalist',
      deleteEvent: 'delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'search',
      countSlot: 'count-slot',
      listBookedEvents: 'list-booked-events',
      listBookedEventsCount: 'list-booked-events-count',
      // listUpcomingBookedEvents: 'list-upcoming-booked-events',
      // listUpcomingBookedEventsCount: 'list-upcoming-booked-events-count',
      deleteBookedEvent: 'delete-booked-event',
      rescheduleBookedEvent: 'reschedule',
      getTokenInfo: 'getauthorization-pece-getuserdata'
    },
    urls: [],
    timeZone: [
      {text: 'Alaska Standard Time', value: '-08:00|America/Anchorage'},
      {text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles'},
      {text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver'},
      {text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix'},
      {text: 'Central Standard Time', value: '-05:00|America/Chicago'},
      {text: 'Eastern Standard Time', value: '-04:00|America/New_York'},
      {text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu'}
    ],
    eventType: [
      {text: "Admin Meetings", value: 1},
      {text: "Type 2", value: 2},
      {text: "Type 3", value: 3},
      {text: "Type 3", value: 4}
    ],
    responseData: [],
    // primaryCondition: {$or: [{event_type: 1}, {event_type: 2}]},
    primaryCondition: {},


    // lib-listing inputs
    skipFields: [],
    modify_header_array: {
      patient_name: 'Patient Name',
      doctor_name: 'Doctor Name',
      doctors_office_name: 'Doctor Office Name',
      booking_date: 'Booked On',
      startdate: 'Event Date',
      slot: "Start Time",
      slot_end_time: 'End Time',
      timezoneName: 'Timezone',
      status: 'Status',
      tech_name: 'Tech name'
    },
    source: 'google-events',
    date_search_source_count: 0,
    libdata: {
      basecondition: {},
      detailview_override: [
        {key: 'event_title', val: 'Event Title'},
        {key: 'startdate', val: 'Start Date'},
        {key: 'practice_name', val: 'Practice Name'},
        {key: 'patient_name', val: 'Patient Name'},
        {key: 'patient_email', val: 'Patient Email'},
        {key: 'has_pvt', val: 'Has PVT'},
        {key: 'has_diabetics', val: 'Has Diabetics'},
        {key: 'Had_PVD', val: 'Had PVD'},
        {key: 'booking_date', val: 'Booking Date'},
        {key: 'additional_notes', val: 'Additional Notes'},

        {key: 'insurance_name', val: 'Insurance Name'},
        {key: 'insurance_type_name', val: 'Insurance Type'},

        {key: 'angina_six_months', val: 'Angina(6 Months)'},
        {key: 'angina_today', val: 'Angina(Today)'},
        {key: 'bv_six_months', val: 'Blurred Vision(6 Months)'},
        {key: 'bv_today', val: 'Blurred Vision(Today)'},
        {key: 'ebs_six_months', val: 'Elevated Blood Sugar(6 Months)'},
        {key: 'ebs_today', val: 'Elevated Blood Sugar(Today)'},
        {key: 'et_six_months', val: 'Extreme Thirst(6 Months)'},
        {key: 'et_today', val: 'Extreme Thirst(Today)'},
        {key: 'fu_six_months', val: 'Frequent Urination(6 Months)'},
        {key: 'fu_today', val: 'Frequent Urination(Today)'},
        {key: 'ft_six_months', val: 'Fatigue (Tiredness)(6 Months)'},
        {key: 'ft_today', val: 'Fatigue (Tiredness)(Today)'},

        {key: 'hb_six_months', val: 'Heartburn(6 Months)'},
        {key: 'hb_today', val: 'Heartburn(Today)'},
        {key: 'ih_six_months', val: 'Increased Hunger(6 Months)'},
        {key: 'ih_today', val: 'Increased Hunger(Today)'},
        {key: 'nau_six_months', val: 'Nausea(6 Months)'},
        {key: 'nau_today', val: 'Nausea(Today)'},
        {key: 'nthf_six_months', val: 'Numbness & Tingling in Hands or Feet(6 Months)'},
        {key: 'nthf_today', val: 'Numbness & Tingling in Hands or Feet(Today)'},
        {key: 'vomiting_six_months', val: 'Vomiting(6 Months)'},
        {key: 'vomiting_today', val: 'Vomiting(Today)'},
        {key: 'bs_six_months', val: 'Burning Sensations(6 Months)'},
        {key: 'bs_today', val: 'Burning Sensations(Today)'},

        {key: 'ddf_six_months', val: 'Difficulty Digesting Food(6 Months)'},
        {key: 'ddf_today', val: 'Difficulty Digesting Food(Today)'},
        {key: 'dof_six_months', val: 'Dizziness or Fainting(6 Months)'},
        {key: 'dof_today', val: 'Dizziness or Fainting(Today)'},
        {key: 'ei_six_months', val: 'Exercise Intolerance(6 Months)'},
        {key: 'ei_today', val: 'Exercise Intolerance(Today)'},
        {key: 'sd_six_months', val: 'Sexual Difficulties(6 Months)'},
        {key: 'sd_today', val: 'Sexual Difficulties(Today)'},
        {key: 'sa_six_months', val: 'Sweat Abnormalities(6 Months)'},
        {key: 'sa_today', val: 'Sweat Abnormalities(Today)'},
        {key: 'thf_six_months', val: 'Tingling Hands & Feet(6 Months)'},
        {key: 'thf_today', val: 'Tingling Hands & Feet(Today)'},

        {key: 'up_six_months', val: 'Urinary Problems(6 Months)'},
        {key: 'up_today', val: 'Urinary Problems(Today)'},
        {
          key: 'angina_six_months',
          val: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)(6 Months)'
        },
        {
          key: 'angina_today',
          val: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)(Today)'
        },
        {key: 'cptgawr_six_months', val: 'Chest Pain that goes away with rest(6 Months)'},
        {key: 'cptgawr_today', val: 'Chest Pain that goes away with rest(Today)'},
        {key: 'hrtbn_six_months', val: 'Heartburn(6 Months)'},
        {key: 'hrtbn_today', val: 'Heartburn(Today)'},
        {key: 'pic_six_months', val: 'Pain In Calves(6 Months)'},
        {key: 'pic_today', val: 'Pain In Calves(Today)'},
        {key: 'sob_six_months', val: 'Shortness of Breath(6 Months)'},
        {key: 'sob_today', val: 'Shortness of Breath(Today)'},

        {key: 'stroke_six_months', val: 'Stroke(6 Months)'},
        {key: 'stroke_today', val: 'Stroke(Today)'},
        {key: 'tia_six_months', val: 'TIA (mini stroke)(6 Months)'},
        {key: 'tia_today', val: 'TIA (mini stroke)(Today)'},
        {key: 'headaches_six_months', val: 'Headaches(6 Months)'},
        {key: 'headaches_today', val: 'Headaches(Today)'},
        {key: 'dizziness_six_months', val: 'Dizziness(6 Months)'},
        {key: 'dizziness_today', val: 'Dizziness(Today)'},
        {key: 'soa_six_months', val: 'Swelling of Ankles(6 Months)'},
        {key: 'soa_today', val: 'Swelling of Ankles(Today)'},
        {key: 'blv_six_months', val: 'INSULIN RESISTANCE (IR)(6 Months)'},
        {key: 'blv_today', val: 'INSULIN RESISTANCE (IR)(Today)'},

        {key: 'ebsr_six_months', val: 'Elevated Blood Sugar(6 Months)'},
        {key: 'ebsr_today', val: 'Elevated Blood Sugar(Today)'},
        {key: 'ext_six_months', val: 'Extreme Thirst(6 Months)'},
        {key: 'ext_today', val: 'Extreme Thirst(Today)'},
        {key: 'ftd_six_months', val: 'Fatigue (Tiredness)(6 Months)'},
        {key: 'ftd_today', val: 'Fatigue (Tiredness)(Today)'},
        {key: 'ihr_six_months', val: 'Increased Hunger(6 Months)'},
        {key: 'ihr_today', val: 'Increased Hunger(Today)'},
        {key: 'burns_six_months', val: 'SMALL FIBER SENSORY NEUROPATHY (SFN)(6 Months)'},
        {key: 'burns_today', val: 'SMALL FIBER SENSORY NEUROPATHY (SFN)(Today)'},
        {key: 'pcwsbs_six_months', val: 'Painful Contact With Socks or Bed Sheets(6 Months)'},
        {key: 'pcwsbs_today', val: 'Painful Contact With Socks or Bed Sheets(Today)'},

        {key: 'sess_six_months', val: 'Stabbing or Electrical Shock Sensation(6 Months)'},
        {key: 'sess_today', val: 'Stabbing or Electrical Shock Sensation(Today)'},
        {key: 'pnsf_six_months', val: 'Pins And Needles Sensation In Feet(6 Months)'},
        {key: 'pnsf_today', val: 'Pins And Needles Sensation In Feet(Today)'},
        {key: 'bldv_six_months', val: 'Blurred Vision(6 Months)'},
        {key: 'bldv_today', val: 'Blurred Vision(Today)'},
        {key: 'ccps_six_months', val: 'Cold, Clammy, Pale Skin(6 Months)'},
        {key: 'ccps_today', val: 'Cold, Clammy, Pale Skin(Today)'},
        {key: 'depression_six_months', val: 'Depression(6 Months)'},
        {key: 'depression_today', val: 'Depression(Today)'},
        {key: 'dol_six_months', val: 'Dizziness or Lightheadedness(6 Months)'},
        {key: 'dol_today', val: 'Dizziness or Lightheadedness(Today)'},

        {key: 'thirst_six_months', val: 'Thirst(6 Months)'},
        {key: 'thirst_today', val: 'Thirst(Today)'},
        {key: 'fainting_six_months', val: 'Fainting(6 Months)'},
        {key: 'fainting_today', val: 'Fainting(Today)'},
        {key: 'fatt_six_months', val: 'Fatigue (Tiredness)(6 Months)'},
        {key: 'fatt_today', val: 'Fatigue (Tiredness)(Today)'},
        {key: 'loc_six_months', val: 'Lack of Concentration(6 Months)'},
        {key: 'loc_today', val: 'Lack of Concentration(Today)'},
        {key: 'loe_six_months', val: 'Lack of Energy(6 Months)'},
        {key: 'loe_today', val: 'Lack of Energy(Today)'},
        {key: 'nausea_six_months', val: 'INSULIN RESISTANCE (IR)(6 Months)'},
        {key: 'nausea_today', val: 'INSULIN RESISTANCE (IR)(Today)'},

        {key: 'rsb_six_months', val: 'Rapid, Shallow Breathing(6 Months)'},
        {key: 'rsb_today', val: 'Rapid, Shallow Breathing(Today)'},
        {key: 'bciv_six_months', val: 'Blood clot in a vein (Venous Thrombosis)(6 Months)'},
        {key: 'bciv_today', val: 'Blood clot in a vein (Venous Thrombosis)(Today)'},
        {key: 'hattk_six_months', val: 'Heart Attack(6 Months)'},
        {key: 'hattk_six_months', val: 'Heart Attack(Today)'},
        {key: 'ihtfs_six_months', val: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)(6 Months)'},
        {key: 'iftfs_today', val: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)(Today)'},
        {key: 'strk_six_months', val: 'Stroke(6 Months)'},
        {key: 'strk_today', val: 'Stroke(Today)'}
      ],
      updateendpoint: 'statusupdate',
      hidestatustogglebutton: true,
      hidedeletebutton: true,
      hideviewbutton: true,
      hideeditbutton: true,// all these button options are optional not mandatory
      tableheaders: ['patient_name', 'doctor_name', 'doctors_office_name', 'tech_name', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName', 'status'], //not required
      custombuttons: []
    },
    updatetable: false,
    limitcond: {
      "limit": 10,
      "skip": 0,
      "pagecount": 1
    },
    sortdata: {
      "type": 'desc',
      "field": 'booking_date',
      "options": ['patient_name', 'booking_date', 'startdate', 'slot', 'slot_end_time']
    },
    custom_link: [],
    search_settings: {
      // this is use for  date search
      datesearch: [{
        startdatelabel: "Events After",
        enddatelabel: "Events Before",
        submit: "Search",
        field: "startdate_unix"
      }],

      // this is use for  select search
      selectsearch: [
        {
          label: 'Search By Status',
          field: 'status',
          values: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Completed'}, {val: 2, 'name': 'Canceled'}]
        },
        {
          label: 'Search By Booking Type',
          field: 'is_google_event',
          values: [{val: 'No', name: 'Manual'}, {val: 'Yes', name: 'Calendar'}]
        }
      ],

      // this is use for  text search
      textsearch: [{label: "Search By Patient Name", field: 'patient_name_search'}],

      // this is use for  Autocomplete search
      search: []
    },
    statusarray: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Completed'}, {val: 2, 'name': 'Canceled'}],
    detail_skip_array: ['_id', 'username', 'useremail', 'startdate_unix', 'can_reschedule', 'is_google_event', 'doctor_id', 'doctors_office_id', 'doctor_name', 'doctors_office_name', 'tech_id', 'tech_name', 'timezoneName', 'parent_id', 'parent_type', 'userid', 'username', 'start_datetime_unix', 'insurance_id', 'insurance_type', 'status', 'patient_name_search']
  };


  constructor(public cookie: CookieService, public snackBar: MatSnackBar,
              public httpService: HttpServiceService) {
  }

  ngOnInit() {

    // set tech and doctors office search for admin
    if (JSON.parse(this.cookie.get('user_details')).user_type === 'admin') {
      this.configData.search_settings.search.push(
        {
          label: "Search By Tech", field: 'tech_id',
          values: [],
          serversearchdata: {endpoint: 'get-tech-for-autocomplete-search'}
        },
        {
          label: "Search By Doctor Office", field: 'doctors_office_id',
          values: [],
          serversearchdata: {endpoint: 'get-doctor-office-for-autocomplete-search'}
        }
      );
      this.configData.search_settings.selectsearch.push({
        label: 'Search By Parent Type',
        field: 'parent_type',
        values: [
          {val: 'admin', name: 'Admin'},
          {val: 'distributor', name: 'Distributor'},
          {val: 'diagnostic_admin', name: 'Diagnostic Admin'},
          {val: 'doctor_group', name: 'Doctor Group Admin'}
        ]
      });
    }
    // load doctor search dynamically
    // let user_details = JSON.parse(this.cookie.get('user_details'));
    if (JSON.parse(this.cookie.get('user_details')).user_type === 'admin') {
      this.configData.search_settings.search.push({
        label: "Search By Doctor ", field: 'doctor_id',
        values: [],
        serversearchdata: { endpoint: 'get-doctor-for-autocomplete-search' }
      });
    } else {
      this.configData.search_settings.search.push({
        label: "Search By Doctor ", field: 'doctor_id',
        values: this.doctors,
      })
    }


    /* ********************* Set custom button ********************* */
    const datafields = this.configData.libdata.detailview_override.map(item => item.key);
    this.configData.libdata.custombuttons.push({
      label: 'View Details', type: 'action',
      datatype: 'local', datafields: datafields,
      headermessage: 'View Details',
      // cond:'status',
      // condval:0
    })
    /* *************************************************************** */

    if (this.cookie.check('jwtToken')) {
      this.configData.jwtToken = this.cookie.get('jwtToken');
      let data: any = {
        token: this.configData.jwtToken,
        condition: {},
        sort: {type: 'desc', field: 'booking_date'}
      }
      /* Create condition with respect to the user_type */
      if (this.cookie.check('user_details')) {
        switch (JSON.parse(this.cookie.get('user_details')).user_type) {
          case 'admin':
            // do nothing. all records will be loaded...
            break;

          case 'doctor_office':
            data.condition = Object.assign(
              data.condition, {doctors_office_id: JSON.parse(this.cookie.get('user_details'))._id}
            );

            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              doctors_office_id: JSON.parse(this.cookie.get('user_details'))._id
            }
            break;

          case 'doctor':
            data.condition = Object.assign(
              data.condition, {doctor_id: JSON.parse(this.cookie.get('user_details'))._id}
            );

            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              doctor_id: JSON.parse(this.cookie.get('user_details'))._id
            }
            break;

          default: // for tech
            data.condition = Object.assign(
              data.condition, {
                $or: [
                  {userid: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}},
                  {tech_id: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}}
                ]
              }
            );
            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              $or: [
                {userid: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}},
                {tech_id: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}}
              ]
            }
            break;
        }
      }

      setTimeout(() => {

        this.httpService.postRequest(this.configData.endPoint.listBookedEvents, data).subscribe((response: any) => {
          // Set dataset in responseData
          this.configData.responseData = response.results.res;

          // Create skipFields array(first save all the keys from the dataset)
          if (response.results.res > 0)
            this.configData.skipFields = Object.keys(response.results.res[0]);
          let requiredFields = ['patient_name', 'doctor_name', 'doctors_office_name', 'tech_name', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName', 'status'];

          // Check user_type === 'doctor_office'
          if (JSON.parse(this.cookie.get('user_details')).user_type === 'doctor_office') {
            requiredFields.splice(requiredFields.indexOf('doctors_office_name'), 1);
            this.configData.libdata.tableheaders.splice(
              this.configData.libdata.tableheaders.indexOf('doctors_office_name'), 1
            );
          }

          // Modify the skipFields array(splicing the keys which is in the requiredFields)
          for (let i = 0; i < requiredFields.length; i++) {
            this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
          }
        });
      }, 1000);

      // Merge logged in user details with the config data
      // let userDetails: any = JSON.parse(this.cookie.get('user_details'));
      // this.configData = Object.assign(this.configData, userDetails);

      /* ****************** Get total booked events count ****************** */
      setTimeout(() => {

        this.httpService.postRequest(this.configData.endPoint.listBookedEventsCount, data).subscribe((response: any) => {
          this.configData.date_search_source_count = response.count;
        });
      }, 1500);
      /* ******************************************************************* */

    } else {
      this.openSnackBar('Token not found', null);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
