import {Component, OnInit, ViewChild, HostListener, Input, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {HttpServiceService} from '../../../../../services/http-service.service';
import {DatePipe} from '@angular/common';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {PatientReportViewComponent} from '../patient-report-view.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  public R000Text: string = "R00.0 Tachycardia, unspecified Abnormal Heart Rhythm & Electrical Stability";
  public htmlText: any = {
    nav: 'Add Patient',
    header: "Physician Report"
  };

  public reportDetails: any;
  public orginalReportDetails: any;
  public cookiesData: any;

  @Input()
  set patientDetails(patientDetailsData: any) {
    this.reportDetails = patientDetailsData;
  }

  @Input()
  set orginalData(orginalData: any) {
    this.orginalReportDetails = orginalData;
  }

  public configData: any = {
    patientInfoFormFields: [],
    calendarInfoFormFields: {},
    primaryCondition: {}
  };
  formfieldrefreshdata: any = null;
  public insuranceName: any = '';

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService, public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe) {
    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
  }

  ngOnInit() {
    // console.log("Patient Details Start =============================================");
    // console.log("Print Data: ", this.orginalReportDetails.patient_details[0]);
    // console.log("Patient Details End =============================================");

    var data = {
      "source": "data_pece",
      "condition": {
        "_id_object": this.orginalReportDetails.patient_details[0].insurance_id
      },
      "token": this.cookiesData.jwtToken
    }
    // this.httpService.httpViaPost('datalist', data).subscribe(response => {
    //   if(response.status == true) {
    //     this.insuranceName = response.res[0].insurancename;
    //     console.log(">", this.configData.patientInfoFormFields[11]);
    //     console.log(">>", response.res);
    //   }
    // });

    //console.log("Patient details >>>", this.orginalReportDetails.patient_details[0].doctor_details[0].practice_name);

    var practice_name: any = '';
    if(this.orginalReportDetails.patient_details[0].doctor_details.length == 0) {
      practice_name = 'Not Found';
    } else {
      practice_name = this.orginalReportDetails.patient_details[0].doctor_details[0].practice_name;
    }

    let patientInfoFormFields: any = [
      {
        type: 'input', name: 'practice_name', placeholder: 'Practice Name',
        label: 'Practice Name', value: practice_name,
        caption: 'Patient General Information', disabled: true
      },
      {
        type: 'input', name: 'address', placeholder: 'Address', label: 'Address',
        value: this.orginalReportDetails.patient_details[0].address, disabled: true
      },
      {
        type: 'input', name: 'state', placeholder: 'State', label: 'State',
        value: this.orginalReportDetails.patient_details[0].state, disabled: true
      },
      {
        type: 'input', name: 'city', placeholder: 'City', label: 'City',
        value: this.orginalReportDetails.patient_details[0].city, disabled: true
      },
      {
        type: 'input', name: 'zip', placeholder: 'ZIP', label: 'ZIP',
        value: this.orginalReportDetails.patient_details[0].zip, disabled: true
      },
      {
        type: 'input', name: 'patient_name', label: 'Patient Name',
        value: this.orginalReportDetails.patient_details[0].patient_name, disabled: true
      },
      {
        type: 'input', name: 'gender', label: 'Gender',
        value: this.orginalReportDetails.patient_details[0].gender, disabled: true
      },
      {
        type: 'input', name: 'patient_email', label: 'Patient Email',
        value: this.orginalReportDetails.patient_details[0].patient_email, disabled: true
      },
      {
        type: 'input', name: 'height', label: 'Height',
        value: this.orginalReportDetails.patient_details[0].height, disabled: true
      },
      {
        type: 'input', name: 'weight', label: 'Weight',
        value: this.orginalReportDetails.patient_details[0].weight, disabled: true
      },
      {
        type: 'input', name: 'dob', label: 'Date of Birth',
        value: this.orginalReportDetails.patient_details[0].dob, disabled: true
      }
    ];

    let checkboxFields: any = [
      {
        type: 'checkbox', caption: 'Autonomic Nervous System Dysfunction (ANSD)',
        label: 'Blurred Vision',
        checkItems: [
          {
            name: 'bv_six_months',
            value: this.orginalReportDetails.patient_details[0].bv_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'bv_today',
            value: this.orginalReportDetails.patient_details[0].bv_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Elevated Blood Sugar',
        checkItems: [
          {
            name: 'ebs_six_months',
            value: this.orginalReportDetails.patient_details[0].ebs_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ebs_today',
            value: this.orginalReportDetails.patient_details[0].ebs_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Extreme Thirst',
        checkItems: [
          {
            name: 'et_six_months',
            value: this.orginalReportDetails.patient_details[0].et_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'et_today',
            value: this.orginalReportDetails.patient_details[0].et_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Frequent Urination',
        checkItems: [
          {
            name: 'fu_six_months',
            value: this.orginalReportDetails.patient_details[0].fu_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'fu_today',
            value: this.orginalReportDetails.patient_details[0].fu_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        checkItems: [
          {
            name: 'ft_six_months',
            value: this.orginalReportDetails.patient_details[0].ft_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ft_today',
            value: this.orginalReportDetails.patient_details[0].ft_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Heartburn',
        checkItems: [
          {
            name: 'hb_six_months',
            value: this.orginalReportDetails.patient_details[0].hb_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'hb_today',
            value: this.orginalReportDetails.patient_details[0].hb_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Increased Hunger',
        checkItems: [
          {
            name: 'ih_six_months',
            value: this.orginalReportDetails.patient_details[0].ih_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ih_today',
            value: this.orginalReportDetails.patient_details[0].ih_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Nausea',
        checkItems: [
          {
            name: 'nau_six_months',
            value: this.orginalReportDetails.patient_details[0].nau_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'nau_today',
            value: this.orginalReportDetails.patient_details[0].nau_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Numbness & Tingling in Hands or Feet',
        checkItems: [
          {
            name: 'nthf_six_months',
            value: this.orginalReportDetails.patient_details[0].nthf_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'nthf_today',
            value: this.orginalReportDetails.patient_details[0].nthf_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Vomiting',
        checkItems: [
          {
            name: 'vomiting_six_months',
            value: this.orginalReportDetails.patient_details[0].vomiting_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'vomiting_today',
            value: this.orginalReportDetails.patient_details[0].vomiting_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', caption: 'Sudomotor Dysfunction (SUDOD)',
        label: 'Burning Sensations',
        checkItems: [
          {
            name: 'bs_six_months',
            value: this.orginalReportDetails.patient_details[0].bs_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'bs_today',
            value: this.orginalReportDetails.patient_details[0].bs_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Difficulty Digesting Food',
        checkItems: [
          {
            name: 'ddf_six_months',
            value: this.orginalReportDetails.patient_details[0].ddf_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ddf_today',
            value: this.orginalReportDetails.patient_details[0].ddf_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Dizziness or Fainting',
        checkItems: [
          {
            name: 'dof_six_months',
            value: this.orginalReportDetails.patient_details[0].dof_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'dof_today',
            value: this.orginalReportDetails.patient_details[0].dof_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Exercise Intolerance',
        checkItems: [
          {
            name: 'ei_six_months',
            value: this.orginalReportDetails.patient_details[0].ei_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ei_today',
            value: this.orginalReportDetails.patient_details[0].ei_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Sexual Difficulties',
        checkItems: [
          {
            name: 'sd_six_months',
            value: this.orginalReportDetails.patient_details[0].sd_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'sd_today',
            value: this.orginalReportDetails.patient_details[0].sd_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Sweat Abnormalities',
        checkItems: [
          {
            name: 'sa_six_months',
            value: this.orginalReportDetails.patient_details[0].sa_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'sa_today',
            value: this.orginalReportDetails.patient_details[0].sa_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Tingling Hands & Feet',
        checkItems: [
          {
            name: 'thf_six_months',
            value: this.orginalReportDetails.patient_details[0].thf_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'thf_today',
            value: this.orginalReportDetails.patient_details[0].thf_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', label: 'Urinary Problems',
        checkItems: [
          {
            name: 'up_six_months',
            value: this.orginalReportDetails.patient_details[0].up_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'up_today',
            value: this.orginalReportDetails.patient_details[0].up_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
      },
      {
        type: 'checkbox', caption: 'ENDOTHELIAL DYSFUNCTION (ENDOD)',
        label: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)',
        checkItems: [
          {
            name: 'angina_six_months',
            value: this.orginalReportDetails.patient_details[0].angina_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'angina_today',
            value: this.orginalReportDetails.patient_details[0].angina_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'Chest Pain that goes away with rest',
        checkItems: [
          {
            name: 'cptgawr_six_months',
            value: this.orginalReportDetails.patient_details[0].cptgawr_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'cptgawr_today',
            value: this.orginalReportDetails.patient_details[0].cptgawr_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'Heartburn',
        checkItems: [
          {
            name: 'hrtbn_six_months',
            value: this.orginalReportDetails.patient_details[0].hrtbn_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'hrtbn_today',
            value: this.orginalReportDetails.patient_details[0].hrtbn_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'Pain In Calves',
        checkItems: [
          {
            name: 'pic_six_months',
            value: this.orginalReportDetails.patient_details[0].pic_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'pic_today',
            value: this.orginalReportDetails.patient_details[0].pic_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'Shortness of Breath',
        checkItems: [
          {
            name: 'sob_six_months',
            value: this.orginalReportDetails.patient_details[0].sob_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'sob_today',
            value: this.orginalReportDetails.patient_details[0].sob_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'Stroke',
        checkItems: [
          {
            name: 'stroke_six_months',
            value: this.orginalReportDetails.patient_details[0].stroke_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'stroke_today',
            value: this.orginalReportDetails.patient_details[0].stroke_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', label: 'TIA (mini stroke)',
        checkItems: [
          {
            name: 'tia_six_months',
            value: this.orginalReportDetails.patient_details[0].tia_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'tia_today',
            value: this.orginalReportDetails.patient_details[0].tia_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
      },
      {
        type: 'checkbox', caption: 'CARDIOMETABOLIC RISK (CMR)',
        label: 'Headaches',
        checkItems: [
          {
            name: 'headaches_six_months',
            value: this.orginalReportDetails.patient_details[0].headaches_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'headaches_today',
            value: this.orginalReportDetails.patient_details[0].headaches_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
      },
      {
        type: 'checkbox', label: 'Dizziness',
        checkItems: [
          {
            name: 'dizziness_six_months',
            value: this.orginalReportDetails.patient_details[0].dizziness_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'dizziness_today',
            value: this.orginalReportDetails.patient_details[0].dizziness_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
      },
      {
        type: 'checkbox', label: 'Swelling of Ankles',
        checkItems: [
          {
            name: 'soa_six_months',
            value: this.orginalReportDetails.patient_details[0].soa_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'soa_today',
            value: this.orginalReportDetails.patient_details[0].soa_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
      },
      {
        type: 'checkbox', caption: 'INSULIN RESISTANCE (IR)',
        label: 'Blurred Vision',
        checkItems: [
          {
            name: 'blv_six_months',
            value: this.orginalReportDetails.patient_details[0].blv_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'blv_today',
            value: this.orginalReportDetails.patient_details[0].blv_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
      },
      {
        type: 'checkbox', label: 'Elevated Blood Sugar',
        checkItems: [
          {
            name: 'ebsr_six_months',
            value: this.orginalReportDetails.patient_details[0].ebsr_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ebsr_today',
            value: this.orginalReportDetails.patient_details[0].ebsr_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
      },
      {
        type: 'checkbox', label: 'Extreme Thirst',
        checkItems: [
          {
            name: 'ext_six_months',
            value: this.orginalReportDetails.patient_details[0].ext_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ext_today',
            value: this.orginalReportDetails.patient_details[0].ext_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        checkItems: [
          {
            name: 'ftd_six_months',
            value: this.orginalReportDetails.patient_details[0].ftd_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ftd_today',
            value: this.orginalReportDetails.patient_details[0].ftd_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
      },
      {
        type: 'checkbox', label: 'Increased Hunger',
        checkItems: [
          {
            name: 'ihr_six_months',
            value: this.orginalReportDetails.patient_details[0].ihr_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ihr_today',
            value: this.orginalReportDetails.patient_details[0].ihr_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
      },
      {
        type: 'checkbox', caption: 'SMALL FIBER SENSORY NEUROPATHY (SFN)',
        label: 'Burning Sensations',
        checkItems: [
          {
            name: 'burns_six_months',
            value: this.orginalReportDetails.patient_details[0].burns_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'burns_today',
            value: this.orginalReportDetails.patient_details[0].burns_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
      },
      {
        type: 'checkbox', label: 'Painful Contact With Socks or Bed Sheets',
        checkItems: [
          {
            name: 'pcwsbs_six_months',
            value: this.orginalReportDetails.patient_details[0].pcwsbs_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'pcwsbs_today',
            value: this.orginalReportDetails.patient_details[0].pcwsbs_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
      },
      {
        type: 'checkbox', label: 'Pebble or Sandlike Sensation In Shoes',
        checkItems: [
          {
            name: 'psss_six_months',
            value: this.orginalReportDetails.patient_details[0].psss_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'psss_today',
            value: this.orginalReportDetails.patient_details[0].psss_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
      },
      {
        type: 'checkbox', label: 'Stabbing or Electrical Shock Sensation',
        checkItems: [
          {
            name: 'sess_six_months',
            value: this.orginalReportDetails.patient_details[0].sess_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'sess_today',
            value: this.orginalReportDetails.patient_details[0].sess_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
      },
      {
        type: 'checkbox', label: 'Pins And Needles Sensation In Feet',
        checkItems: [
          {
            name: 'pnsf_six_months',
            value: this.orginalReportDetails.patient_details[0].pnsf_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'pnsf_today',
            value: this.orginalReportDetails.patient_details[0].pnsf_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
      },
      {
        type: 'checkbox', caption: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)',
        label: 'Blurred Vision',
        checkItems: [
          {
            name: 'bldv_six_months',
            value: this.orginalReportDetails.patient_details[0].bldv_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'bldv_today',
            value: this.orginalReportDetails.patient_details[0].bldv_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Cold, Clammy, Pale Skin',
        checkItems: [
          {
            name: 'ccps_six_months',
            value: this.orginalReportDetails.patient_details[0].ccps_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'ccps_today',
            value: this.orginalReportDetails.patient_details[0].ccps_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Depression',
        checkItems: [
          {
            name: 'depression_six_months',
            value: this.orginalReportDetails.patient_details[0].depression_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'depression_today',
            value: this.orginalReportDetails.patient_details[0].depression_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Dizziness or Lightheadedness',
        checkItems: [
          {
            name: 'dol_six_months',
            value: this.orginalReportDetails.patient_details[0].dol_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'dol_today',
            value: this.orginalReportDetails.patient_details[0].dol_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Thirst',
        checkItems: [
          {
            name: 'thirst_six_months',
            value: this.orginalReportDetails.patient_details[0].thirst_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'thirst_today',
            value: this.orginalReportDetails.patient_details[0].thirst_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Fainting',
        checkItems: [
          {
            name: 'fainting_six_months',
            value: this.orginalReportDetails.patient_details[0].fainting_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'fainting_today',
            value: this.orginalReportDetails.patient_details[0].fainting_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        checkItems: [
          {
            name: 'fatt_six_months',
            value: this.orginalReportDetails.patient_details[0].fatt_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'fatt_today',
            value: this.orginalReportDetails.patient_details[0].fatt_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Lack of Concentration',
        checkItems: [
          {
            name: 'loc_six_months',
            value: this.orginalReportDetails.patient_details[0].loc_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'loc_today',
            value: this.orginalReportDetails.patient_details[0].loc_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Lack of Energy',
        checkItems: [
          {
            name: 'loe_six_months',
            value: this.orginalReportDetails.patient_details[0].loe_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'loe_today',
            value: this.orginalReportDetails.patient_details[0].loe_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Nausea',
        checkItems: [
          {
            name: 'nausea_six_months',
            value: this.orginalReportDetails.patient_details[0].nausea_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'nausea_today',
            value: this.orginalReportDetails.patient_details[0].nausea_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', label: 'Rapid, Shallow Breathing',
        checkItems: [
          {
            name: 'rsb_six_months',
            value: this.orginalReportDetails.patient_details[0].rsb_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'rsb_today',
            value: this.orginalReportDetails.patient_details[0].rsb_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
      },
      {
        type: 'checkbox', caption: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)',
        label: 'Blood clot in a vein (Venous Thrombosis)',
        checkItems: [
          {
            name: 'bciv_six_months',
            value: this.orginalReportDetails.patient_details[0].bciv_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'bciv_today',
            value: this.orginalReportDetails.patient_details[0].bciv_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
      },
      {
        type: 'checkbox', label: 'Heart Attack',
        checkItems: [
          {
            name: 'hattk_six_months',
            value: this.orginalReportDetails.patient_details[0].hattk_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'hattk_today',
            value: this.orginalReportDetails.patient_details[0].hattk_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
      },
      {
        type: 'checkbox', label: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)',
        checkItems: [
          {
            name: 'ihtfs_six_months',
            value: this.orginalReportDetails.patient_details[0].ihtfs_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'iftfs_today',
            value: this.orginalReportDetails.patient_details[0].iftfs_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
      },
      {
        type: 'checkbox', label: 'Stroke',
        checkItems: [
          {
            name: 'strk_six_months',
            value: this.orginalReportDetails.patient_details[0].strk_six_months,
            label: '6 Months',
            labelPosition: 'before',
            disabled: true
          },
          {
            name: 'strk_today',
            value: this.orginalReportDetails.patient_details[0].strk_today,
            label: 'Today',
            labelPosition: 'before',
            disabled: true
          }
        ],
        isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
      }
    ];

    let requestData: any = {
      token: this.configData.jwtToken,
      condition: {
        _id: this.orginalReportDetails.patient_details[0].insurance_id
      },
      source: 'data_pece'
    }

    if (this.orginalReportDetails.patient_details[0].insurance_id != '') {
      this.httpService.postRequest('get-data', requestData).subscribe((response: any) => {
        let insurance_name = response.res[0].insurancename;
        patientInfoFormFields.push({
          type: 'input', name: 'insurance_name', label: 'Insurance Name',
          value: insurance_name, disabled: true
        });
        this.configData = Object.assign(this.configData,
          {
            patientInfoFormFields: patientInfoFormFields.concat(checkboxFields)
          }
        );
      })
    } else {
      this.configData = Object.assign(this.configData,
        {
          patientInfoFormFields: patientInfoFormFields.concat(checkboxFields)
        }
      );
    }
  }

}
