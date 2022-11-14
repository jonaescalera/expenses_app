/* eslint-disable max-len */
export const convertValueToMask = (value?: string) => {

  //const val = value && 0;
  let result = value ? parseFloat(value).toFixed(2).toString().replace(/\./g, ",") : "0,00";
  const len = value ? Math.ceil(Math.log10(parseFloat(value  + 1))) : 0;


  if(len > 3 && value){
    const first = value.toString().slice(0, len -3);
    const second = value.toString().slice(len-3).replace(/\./g, ",");
    result = first.concat(".",second);

  }

  return result;
  //return value ? Number(value).toFixed(2) : 0.00;
}; 