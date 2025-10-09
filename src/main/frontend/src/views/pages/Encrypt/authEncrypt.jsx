import CryptoJS from "crypto-js";

const encryptAES = (textoriginal) => {

  try {

    const secret_pass = "77~@é56HB{{[}]£Ä!:;*8446schdSHDBDH--'è-ééçç'((-(((()))=)=à)à)*$ù$zeêpppqa:w!w:xc:;c:,v;v,;v,nb,b!***q$a^zpef";

    const datafinal = CryptoJS.AES.encrypt(JSON.stringify(textoriginal), secret_pass).toString();

    return datafinal;
  }
  catch (error) {

    return null;

  }

}

export default encryptAES;
