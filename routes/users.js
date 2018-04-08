var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM users ',function(err, rows)
        {

            if(err) {

                console.log("Error Selecting : %s ",err );
            } else {

                res.send(rows);
            }
        });
    });
};
module.exports = router;
