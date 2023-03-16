function handleSuccess (res, data) {
  res.writeHead(200);
  res.write(JSON.stringify({
    "status": "success",
    "data": data
  }))
  res.end();
}
module.exports = handleSuccess;