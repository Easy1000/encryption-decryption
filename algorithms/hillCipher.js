import { alphabet } from "../alphabet.js";

const keyMatrix = [
  [6, 24, 1],
  [13, 16, 10],
  [20, 17, 15],
];
const inverseKeyMatrix = [
  [8, 5, 10],
  [21, 8, 21],
  [21, 12, 8],
];

function hillCipherEncryption(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  while (message.length % 3 != 0) {
    message += "X";
  }

  const messageMatrix = [];
  const cipherMatrix = [];
  let cipherText = "";

  for (let i = 0; i < message.length; i += 3) {
    const messageChunk = [];
    for (let j = i; j < i + 3; j++) {
      messageChunk.push(alphabet.indexOf(message[j]));
    }
    messageMatrix.push(messageChunk);
  }

  messageMatrix.forEach((messageChunk) => {
    const cipherChunk = [];
    for (let i = 0; i < 3; i++) {
      let value = 0;
      for (let j = 0; j < 3; j++) {
        value += messageChunk[j] * keyMatrix[j][i];
      }
      value = value % 26;
      cipherChunk.push(value);
    }
    cipherMatrix.push(cipherChunk);
  });

  cipherMatrix.forEach((cipherChunk) => {
    for (let i = 0; i < 3; i++) cipherText += alphabet.charAt(cipherChunk[i]);
  });

  return cipherText;
}

function hillCipherDecryption(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  const messageMatrix = [];
  const decipherMatrix = [];
  let decipherText = "";

  for (let i = 0; i < message.length; i += 3) {
    const messageChunk = [];
    for (let j = i; j < i + 3; j++) {
      messageChunk.push(alphabet.indexOf(message[j]));
    }
    messageMatrix.push(messageChunk);
  }

  messageMatrix.forEach((messageChunk) => {
    const decipherChunk = [];
    for (let i = 0; i < 3; i++) {
      let value = 0;
      for (let j = 0; j < 3; j++) {
        value += messageChunk[j] * inverseKeyMatrix[j][i];
      }
      value %= 26;
      decipherChunk.push(value);
    }
    decipherMatrix.push(decipherChunk);
  });

  decipherMatrix.forEach((decipherChunk) => {
    for (let i = 0; i < 3; i++)
      decipherText += alphabet.charAt(decipherChunk[i]);
  });

  return decipherText;
}

export { hillCipherEncryption, hillCipherDecryption };
