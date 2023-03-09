import { alphabet } from "../alphabet.js";

const vigenereKey = "ITADORI";

function vigenereCipher(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  let j = 0;

  let cipherText = "";

  for (let i = 0; i < message.length; i++) {
    if (j == vigenereKey.length) j = 0;

    let shift =
      (alphabet.indexOf(message[i]) + alphabet.indexOf(vigenereKey[j])) % 26;

    cipherText += alphabet.charAt(shift);

    j++;
  }

  return cipherText;
}

function vigenereDecipher(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  let j = 0;

  let decipherText = "";

  for (let i = 0; i < message.length; i++) {
    if (j == vigenereKey.length) j = 0;

    let backShift =
      alphabet.indexOf(message[i]) - alphabet.indexOf(vigenereKey[j]);

    if (backShift < 0) backShift = 26 + backShift;
    else backShift %= 26;

    decipherText += alphabet.charAt(backShift);

    j++;
  }

  return decipherText;
}

export { vigenereCipher, vigenereDecipher };
