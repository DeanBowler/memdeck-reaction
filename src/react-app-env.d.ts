// /// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    /* LogRocket project key */
    readonly REACT_APP_LOGROCKET_KEY: string;
    readonly REACT_APP_VERSION: string;
  }
}
