const environment = require('../enums/environment.enum');

const getBaseUrl = () => {
    let baseUrl = '';
    switch (process.env.NODE_ENV) {
        case environment.DEVELOPMENT:
            baseUrl = 'http://localhost:3000';
            break;
        case environment.PRODUCTION:
            baseUrl = 'https://myapp.com';
            break;
        default:
            baseUrl = 'http://localhost:3000';
            break;
    }
    return baseUrl;
};