function handleSuccess(res, data) {
  // .send
  // 依據傳入型別來決定回傳格式：
  // String => HTML <h1>hello</h1>
  // Array or Object => JSON
  // 且預設會帶 res.end();
  res.send({
    status: true,
    data
  });
  // 擔心的話也可以保守點，將 res.end(); 帶上。
  res.end();
}
module.exports = handleSuccess;
