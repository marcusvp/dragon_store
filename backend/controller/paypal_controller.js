exports.getPaypalId = (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
};
