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

export const setItemLocalStorage = (key , value)=>{
  if( !key || !value){
    return console.log('Can not store in localstorage');
  }

  const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key , valueToStore);
};

export const getItemInLocalStorage = (key) =>{
    if(!key){
      return console.log('Can not find the value against this key');
    }

    return localStorage.getItem(key);
};

export const removeItemLocalStorage = (key) =>{
  if(!key){
    return console.log('can not find this key');
  }

  localStorage.removeItem(key);
}