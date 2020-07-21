// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/
// https://qzgvkmkqh6.execute-api.us-east-1.amazonaws.com/production/api/
export const environment = {
  siteBaseUrl: "https://testbedpece.influxiq.com",
  s3bucket: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/",
  apiBaseUrl: "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api/",
  apiBaseUrl1: "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api1/",
  fileUploadUrl: "https://fileupload.influxhostserver.com/",
  pagination: [20, 50, 100, 200, 500],
  logo: "https://5hyccia9v2.execute-api.us-east-1.amazonaws.com/dev/api/",
  siteTitle: "AWS Backend",
  footerText: "AWS Copyright 2020",
  production: true,
  floatPattern: "(^[0-9]{1,9})+(\.[0-9]{1,4})?$",
  googleSyncApi: "https://gapi.betoparedes.com/connect-calendar-pece-live.php",
  calendarApi: "https://m9mkuic6o9.execute-api.us-east-1.amazonaws.com/dev/api/",

  doctorSignUpBaseUrl: "https://pece-doctor-signup.influxiq.com",
  
  training_url: "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
