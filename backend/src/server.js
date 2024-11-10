const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/todo');

app.use(cors());
app.use(express.json());

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  return res.json(items);
});

app.post('/items', async (req, res) => {
  const name = req.body.name;
  const ans = await Item.create({ name });
  return res.json(ans);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.listen(3000, () => {
  console.log('Listening on PORT 3000');
});
