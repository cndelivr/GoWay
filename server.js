const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

// 保存打卡记录到文件
app.post('/save', (req, res) => {
  var data = req.body;
  // 读取现有数据
  var rawData = fs.readFileSync('./data.json');
  var records = [];
  if (rawData) {
    records = JSON.parse(rawData);
  }
  // 添加新数据
  records.push({
    location: data.location,
    feelings: data.feelings,
    timestamp: data.timestamp
  });
  // 将数据写回文件
  fs.writeFileSync('./data.json', JSON.stringify(records));
  res.sendStatus(200);
});

// 获取打卡记录数据
app.get('/data', (req, res) => {
  var pageNum = parseInt(req.query.page || 1);
  var pageSize = 5;
  var rawData = fs.readFileSync('./data.json');
  var records = [];
  if (rawData) {
    records = JSON.parse(rawData);
  }
  var start = (pageNum - 1) * pageSize;
  var end = start + pageSize;
  var data = records.slice(start, end);
  res.json(data);
});

app.listen(3000, () => console.log('Server is running.'));
