const rowColumnKey = [1, 0, 2];

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

export { rowColumnTransposition, rowColumnDecipher };
