const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET
  };
  
  export default envConfig;