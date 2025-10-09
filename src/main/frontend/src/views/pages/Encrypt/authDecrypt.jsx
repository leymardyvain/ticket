import CryptoJS from "crypto-js";

 const decryptAES = (encryptedText) => {

  const secret_pass = "77~@é56HB{{[}]£Ä!:;*8446schdSHDBDH--'è-ééçç'((-(((()))=)=à)à)*$ù$zeêpppqa:w!w:xc:;c:,v;v,;v,nb,b!***q$a^zpef";

  try{

    const byte = CryptoJS.AES.decrypt(encryptedText, secret_pass);

    return JSON.parse(byte.toString(CryptoJS.enc.Utf8));
    
  }
  catch(error){

    return null;

  }
      
}

export default decryptAES;

