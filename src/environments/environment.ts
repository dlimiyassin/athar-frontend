// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    // apiUrlService: 'http://156.67.81.207:8056/api/',
    // loginUrl: 'http://156.67.81.207:8056/',
    // apiUrl: 'http://156.67.81.207:8056/',

    // apiUrlService: 'http://156.67.81.207:8080/api/',
    // loginUrl: 'http://156.67.81.207:8080/',
    // apiUrl: 'http://156.67.81.207:8080/',

    apiUrlService: 'http://localhost:8080/api/',
    loginUrl: 'http://localhost:8080/',
    apiUrl: 'http://localhost:8080/',

    rootAppUrl: 'app',
    typeFormatPdf: 'application/pdf',
    typeFormatExcel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    typeFormatCsv: 'text/csv',


    fieldsShowConsignment: [
        'SellerDto.Address'
    ],
    fieldsShowOrder: [
        'SellerDto.Address'
    ]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
