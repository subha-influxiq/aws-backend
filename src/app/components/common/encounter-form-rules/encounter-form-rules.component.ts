import { Component, OnInit } from '@angular/core';

const ICD10 = [
  { SL: 1, Rules: 'PTG Type is 3 or above and Patient insurance is non Medicare', Remarks: 'Check I73.9' },
  { SL: 2, Rules: 'PTG Type is 3 or above and Patient insurance is Medicare', Remarks: 'Check I73.89' },
  { SL: 3, Rules: 'RI is (A) or above and Patient insurance is non Medicare', Remarks: 'Check I70.209' },
  { SL: 4, Rules: 'Prediabetes Patients with non Medicare', Remarks: 'Uncheck R73.03' },

];

const CPTCode = [
  { SL: 1, Rules: 'PVD is non Medicare', Remarks: 'Uncheck 93923' },
  { SL: 2, Rules: 'Pre-Diabetes in Non Medicare', Remarks: 'Uncheck 95923, 95921' },
  { SL: 3, Rules: 'PVD and State is Texas', Remarks: 'Check 93923' },
  { SL: 4, Rules: 'Pre-Diabetes and State is Arizona', Remarks: 'Uncheck 95923, 95921' },


];

@Component({
  selector: 'app-encounter-form-rules',
  templateUrl: './encounter-form-rules.component.html',
  styleUrls: ['./encounter-form-rules.component.css']
})
export class EncounterFormRulesComponent implements OnInit {
  icdColumns: string[] = ['SL', 'Rules', 'Remarks'];
  dataSource = ICD10;

  dataSourceCPT = CPTCode;
  constructor() { }

  ngOnInit() {
  }

}
