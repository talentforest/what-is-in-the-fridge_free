import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
  staging: {
    apiUrl:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
  prod: {
    apiUrl:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
