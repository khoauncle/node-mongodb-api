let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/notes/:id', (req, res) => {
      const id = req.params.id;
      const detail = { "_id": new ObjectID(id)};
      db.collection('notes').findOne(detail, (err, item) =>{
        if(err)
          res.send({'error': 'An error has occured'});
        else
          res.send(item);
      })
  })

  app.delete('/notes/:id', (req, res) => {
      const id = req.params.id;
      const detail = { "_id": new ObjectID(id)};
      db.collection('notes').remove(detail, (err, item) =>{
        if(err)
          res.send({'error': 'An error has occured'});
        else
          res.send(`Node ${id} is delted.`);
      })
  })

  app.put('/notes/:id', (req, res) => {
      const id = req.params.id;
      const detail = { "_id": new ObjectID(id)};
      const note = {text: req.body.body , title: req.body.title};
      db.collection('notes').update(detail, note, (err, item) =>{
        if(err)
          res.send({'error': 'An error has occured'});
        else
          res.send(item);
      })
  })

  app.post('/notes', (req, res) => {
    const note = {text: req.body.body , title: req.body.title};
    db.collection('notes').insert(note, (err, result) => {
      if(err) {
        res.send({'error': 'An error has occured'});
      } else {
        res.send(result.ops[0])
      }
    })
  })
};
