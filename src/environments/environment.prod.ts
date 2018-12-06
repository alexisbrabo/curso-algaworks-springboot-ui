export const environment = {
  production: true,
  apiUrl: 'https://alexismoney-api.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp('alexismoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
