exports.getPaypalId = (req, res) => {
  const sandboxId =
    "AX6smVEG53KjsmYwfeQiHPY5dNZwxmCZYtrB8dMx0faWdVunkY3Tx3Zxl-C38QzNOlnKo6xSgC96yeQw";
  res.send(process.env.PAYPAL_CLIENT_ID || sandboxId);
};
