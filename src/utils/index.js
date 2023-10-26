export const getFormBody = (params) => {
    let formBody = [];
  
    // body is arr of user and password
    for (let property in params) {
      // javascript method
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // harsh 123 => harsh%2020123
  
      formBody.push(encodedKey + '=' + encodedValue); // concatenate
    }
    return formBody.join('&'); // 'username=harsh&password=123123'
  };