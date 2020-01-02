// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  siteBaseUrl: "http://localhost:4201/",
  s3bucket: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/",
  apiBaseUrl: "https://5hyccia9v2.execute-api.us-east-1.amazonaws.com/dev/api/",
  pagination: [20, 50, 100, 200, 500],
  logo: "https://5hyccia9v2.execute-api.us-east-1.amazonaws.com/dev/api/",
  siteTitle: "AWS Backend",
  footerText: "AWS Copyright 2020",
  production: true
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
