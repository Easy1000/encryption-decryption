#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

import { hillCipherDecryption, hillCipherEncryption } from "./algorithms/hillCipher.js";
import {
  rowColumnTransposition,
  rowColumnDecipher,
} from "./algorithms/rowColumnTransposition.js";
import { caesarCipher, caesarDecipher } from "./algorithms/caesarCipher.js";
import { vigenereCipher, vigenereDecipher } from "./algorithms/vigenereCipher.js";

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
    ${chalk.bgRed(
      "CAESAR CIPHER, VIGENERE CIPHER, HILL CIPHER AND TWO TIMES ROW COLUMN TRANSPOSITION"
    )}

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
      hillCipherEncryption(vigenereCipher(caesarCipher(answer.encryptionInput)))
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
      return "CHTFKYEZTQBD";
    },
  });

  const decrypted = caesarDecipher(
    vigenereDecipher(
      hillCipherDecryption(
        rowColumnDecipher(rowColumnDecipher(answer.decryptionInput))
      )
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
    console.log("Made by Izzi, William and Bani");
  });
}
