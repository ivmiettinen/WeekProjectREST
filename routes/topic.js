const Pool = require('pg').Pool;
const config = require('./config');

//luodaan yhteysallas:
const pool = new Pool(config.conopts);

function getAllTopics(callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query('SELECT * FROM topic', (err, data) => {
      if (err) throw err;
      client.release();
      callback(data.rows);
      console.log(data.rows);
    });
  });
}

function getSingleTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      'SELECT * FROM topic where id = $1',
      [req.params.id],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback(data.rows);
      }
    );
  });
}

function createTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      'INSERT INTO topic(title, description, timetomaster, timespent, source, startlearningdate, inprogress) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [
        req.body.title,
        req.body.description,
        req.body.timetomaster,
        req.body.timespent,
        req.body.source,
        req.body.startlearningdate,
        req.body.inprogress
      ],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback();
      }
    );
  });
}

function updateTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      'UPDATE topic SET title = $1, description = $2, timetomaster = $3, timespent = $4, source = $5, startlearningdate = $6, inprogress = $7 WHERE id = $8',
      [
        req.body.title,
        req.body.description,
        req.body.timetomaster,
        req.body.timespent,
        req.body.source,
        req.body.startlearningdate,
        req.body.inprogress,
        parseInt(req.params.id)
      ],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback();
      }
    );
  });
}

function removeTopic(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      'DELETE FROM topic WHERE id = $1',
      [parseInt(req.params.id)],
      (err, data) => {
        if (err) throw err;
        client.release();
        // kerrotaan että onnistui
        res.status(200).json({
          status: 'Onnistui',
          message: 'Poistettiin Topic.'
        });
        callback();
      }
    );
  });
}

module.exports = {
  getAllUsers: getAllTopics,
  getSingleUser: getSingleTopic,
  createUser: createTopic,
  updateUser: updateTopic,
  removeUser: removeTopic
};

//Module exportiin tulee myöhemmin:
//, getSingleUser, createUser, updateUser, removeUser...

/*Aikaisemmasta viikkoProjektista:


class Topic {
    constructor(id, title, description, timetomaster, timespent, source, startlearningdate, inprogress, inprogress2){
        this.id = id;
        this.title = title;
        this.description = description;
        this.timetomaster = timetomaster;
        this.timespent = timespent;
        this.source = source;
        this.startlearningdate = startlearningdate;
        this.inprogress = inprogress;
        this.inprogress2 = inprogress2;


    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            timetomaster: this.timetomaster,
            timespent: this.timespent,
            source: this.source,
            startlearningdate: this.startlearningdate,
            inprogress: this.inprogress,
            inprogress2: this.inprogress2







        }
    }

}

*/
