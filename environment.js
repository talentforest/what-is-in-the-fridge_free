import Constants from 'expo-constants';

const ENV = {
  dev: {
    haccpApiKey:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
  staging: {
    haccpApiKey:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
  prod: {
    haccpApiKey:
      'CpHKsf24TBolr%2BOFp6cjELHLcIfljdFr5OwGIMRRYXB1dBJC%2B%2FWqfPimkeOuESos36vPL7e%2FrZvCbbsivXKHVw%3D%3D',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  let envVars;

  if (__DEV__) {
    envVars = ENV.dev;
  } else if (env === 'staging') {
    envVars = ENV.staging;
  } else if (env === 'prod') {
    envVars = ENV.prod;
  }

  if (!envVars) {
    envVars = ENV.dev;
  }

  return envVars;
};

export default getEnvVars;
