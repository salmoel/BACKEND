let obj = {};
export function objectIsEmpty(obj) {

  return JSON.stringify(obj) === "{}" ?  true : false
  

}
