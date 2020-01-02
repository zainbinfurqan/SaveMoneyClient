let Config = {
    // PERSIST_SECRET_KEY: "",
    // ENVIRONMENT: "LOCAL",
    ENVIRONMENT: "LOCAL",
    ENVIRONMENTS: {
      LOCAL: {
        API_URL: "http://localhost:3001"
        // API_URL: "http://localhost:3000"
        // API_URL: "https://shrouded-savannah-54835.herokuapp.com/"
    //     // API_URL: "https://desolate-stream-27036.herokuapp.com"
    //     // BASE_IMG_PATH: ""
      },
      DEVELOPMENT: {
          // API_URL: "https://shrouded-savannah-54835.herokuapp.com",
          // BASE_IMG_PATH: ""
      },
      // PRODUCTION: {
      //     API_URL: "",
      //     BASE_IMG_PATH: ""
      // }
    }
  };
  
  Config.env = () => {
    return Config.ENVIRONMENTS[Config.ENVIRONMENT];
  };
  
  export default Config;