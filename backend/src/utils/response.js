const success = (res, data, message = "Success") => {
  res.status(200).json({ success: true, message, data });
};

const error = (res, message = "Error", status = 400) => {
  res.status(status).json({ success: false, message });
};

module.exports = { success, error };
