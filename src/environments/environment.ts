// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAZQ9safmKpggo09eydshbQWOHdgZNHHzk',
    authDomain: 'angular6-slack.firebaseapp.com',
    databaseURL: 'https://angular6-slack.firebaseio.com',
    projectId: 'angular6-slack',
    storageBucket: 'angular6-slack.appspot.com',
    messagingSenderId: '804373228750'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
