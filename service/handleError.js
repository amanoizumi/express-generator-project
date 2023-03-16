function handleError(res, err) {
  res.writeHead(400);
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  res.write(JSON.stringify({
    "status": "false",
    message
  }))
  console.log(err);
  res.end();
}
module.exports = handleError;
