#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rowColumnKey = [1, 0, 2];
const caesarKey = 4;
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

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

await welcome();
await askMode();

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Encryption and Decryption Mini Project"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("PROJECT DESCRIPTION")}
    This project is a simple implementation of some encryption algorithm
    You may input a message and we will apply 
    ${chalk.bgRed("HILL CIPHER AND TWO TIMES ROW COLUMN TRANSPOSITION")}

    So let's get started!
  `);
}

async function askMode() {
  const answer = await inquirer.prompt({
    name: "askMode",
    type: "list",
    message: "Which one do you want to do?",
    choices: ["Encryption", "Decryption", "Exit"],
  });

  return handleAnswer(answer.askMode);
}

async function askEncryptionInput() {
  const answer = await inquirer.prompt({
    name: "encryptionInput",
    type: "input",
    message: "Fill in the message you want to encrypt!",
    default() {
      return "pay more money";
    },
  });

  const encrypted = rowColumnTransposition(
    rowColumnTransposition(
      hillCipherEncryption(caesarCipher(answer.encryptionInput))
    )
  );
  const spinner = createSpinner("Encrypting...").start();
  await sleep();
  spinner.stop();

  console.log(`
    This is your encrypted message: ${encrypted} !!

    Now copy it and let's go to Decryption to decipher it!
  `);
  await sleep();
  askMode();
}

async function askDecryptionInput() {
  const answer = await inquirer.prompt({
    name: "decryptionInput",
    type: "input",
    message: "Fill in the encrypted message!",
    default() {
      return "PYMWIYSRAWLX";
    },
  });

  const decrypted = caesarDecipher(
    hillCipherDecryption(
      rowColumnDecipher(rowColumnDecipher(answer.decryptionInput))
    )
  );
  const spinner = createSpinner("Decrypting...").start();
  await sleep();
  spinner.stop();

  console.log(`
    This is your decrypted message: ${decrypted} !!
  `);
  await sleep();
  askMode();
}

async function handleAnswer(answer) {
  if (answer == "Encryption") {
    askEncryptionInput();
  } else if (answer == "Decryption") {
    askDecryptionInput();
  } else {
    finish();
  }
}

async function finish() {
  console.clear();
  const message = `Thank You`;
  await sleep(500);

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    console.log("Made by Izzi");
  });
}

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

function rowColumnTransposition(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  const rowColumn = [];
  for (let i = 0; i < message.length; i += 3) {
    const messageChunk = [];
    for (let j = i; j < i + 3; j++) {
      messageChunk.push(message[j]);
    }
    rowColumn.push(messageChunk);
  }

  let cipherText = "";

  rowColumnKey.forEach((key) => {
    for (let i = 0; i < message.length / 3; i++)
      cipherText += rowColumn[i][key];
  });

  return cipherText;
}

function rowColumnDecipher(message) {
  message = message.toUpperCase();
  message = message.replace(/\s+/g, "");

  const rowColumn = [];
  for (let i = 0; i < message.length; i += 3) {
    const messageChunk = [];
    for (let j = i; j < i + 3; j++) {
      messageChunk.push(message[j]);
    }
    rowColumn.push(messageChunk);
  }

  let i = 0;
  rowColumnKey.forEach((key) => {
    let j = 0;
    while (i < message.length && j < message.length / 3) {
      rowColumn[j][key] = message[i];
      i++;
      j++;
    }
  });

  let decipherText = "";
  rowColumn.forEach((row) => {
    row.forEach((letter) => (decipherText += letter));
  });

  return decipherText;
}

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
