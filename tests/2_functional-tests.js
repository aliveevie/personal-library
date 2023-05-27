/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
 /*
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  */
  /*
  * ----[END of EXAMPLE TEST]----
  */
const getid = '6472260829d5af9ae8435359'
const deleteid = '647225d637d40063d98fa156'
const postid = '647222b2c21e82adc8e1e529'
  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function() {
        //done();
        chai
            .request(server)
            .keepOpen()
            .post('/api/books')
            .send({
                title: 'Good Book'
            })
            .end((err, res) => {
              assert.equal(res.status, 200)
              assert.isNotEmpty(res.text)
              
            })
      });
      
      test('Test POST /api/books with no title given', function() {
        //done();
        chai
            .request(server)
            .keepOpen()
            .post('/api/books')
            .send({
              _id: ''
            })
            .end((err, res) => {
              assert.equal(res.status, 200)
              assert.equal(res.text, 'missing required field comment')
              
            })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .post('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.text)
          
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .get('/api/books/' + 12345)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'no book exists')
          
        })
      });

      
      test('Test GET /api/books/[id] with valid id in db',  function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .get('/api/books/' + getid)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isNotEmpty(res.text)
          
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(){
        //done();
       
      chai
        .request(server)
        .keepOpen()
        .post('/api/books/' + postid)
        .send({
          _id: postid,
          comment: 'This is a good boy!'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isNotEmpty(res.text)
        })
        
      });


      test('Test POST /api/books/[id] without comment field', function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .post('/api/books/' + postid)
        .send({
          _id: postid,
          comment: ''
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'missing required field comment')
          
        })
      });


      test('Test POST /api/books/[id] with comment, id not in db', function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .post('/api/books/' + 1234560)
        .send({
          _id: 1234560,
          comment: 'This is a good boy!'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.text, 'no book exists')
          
        })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

     
      test('Test DELETE /api/books/[id] with valid id in db', function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .delete('/api/books/' + deleteid)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isString(res.text)
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(){
        //done();
        chai
        .request(server)
        .keepOpen()
        .delete('/api/books/123ertyy/')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'no book exists')
        })
      });

    });

  });

});
