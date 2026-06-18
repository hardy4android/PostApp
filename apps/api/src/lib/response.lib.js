function success(res, data, statusCode = 200) {
  const body = { success: true, data };
  return res.status(statusCode).json(body);
}

function failure(res, error, statusCode = 500) {
  const body = { success: false, error };
  return res.status(statusCode).json(body);
}

function paginated(res, data, count) {
  const body = { success: true, data, count };
  return res.status(200).json(body);
}

module.exports = { success, failure, paginated };
