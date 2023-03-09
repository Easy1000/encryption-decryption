import { alphabet } from "../alphabet.js";

const caesarKey = 4;

function caesarCipher(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  let cipherText = "";
  for (let i = 0; i < message.length; i++) {
    cipherText += alphabet.charAt(
      (alphabet.indexOf(message[i]) + caesarKey) % 26
    );
  }

  return cipherText;
}

function caesarDecipher(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  let decipherText = "";
  for (let i = 0; i < message.length; i++) {
    let shift = alphabet.indexOf(message[i]) - caesarKey;

    if (shift < 0) shift = 26 + shift;
    else shift %= 26;

    decipherText += alphabet.charAt(shift);
  }

  return decipherText;
}

export { caesarCipher, caesarDecipher };
