/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let Book = require('../models/schema').BookModel

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      
      Book.find()
          .exec()
          .then((data) => {
           const response = data.map((item) => ({
            title: item.title,
            _id: item._id,
            commentcount: item.comments.length
           }))
            res.json(response)
           
            })

    
           
})
    
    
    .post(function (req, res){
      let title = req.body.title;
      if(!title){
        res.send('missing required field title')
        return
      }
      //response will contain new book object including atleast _id and title
      Book.insertMany({title: title})
          .then((data) => {
            const response = {
              title: data[0].title,
              _id: data[0].id,
            }
            res.send(response)
            return
          })
          .catch((e) => {
            console.log(e)
          })
    
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany()
          .then((data) => {
            res.send('complete delete successful')
            console.log('delete successful!')
          })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid)
      .then((data) => {
        if(!data){
          res.send('no book exists')
          return
        }
        res.json(data)
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment){
        res.send('missing required field comment')
        return
      }
      //json res format same as .get
      Book.findById(bookid)
          .then((data) => {
          if(!data){
            res.send('no book exists')
            return
          }
          data.comments.push(comment)
          data.save()
              .then((savedData) => {
                res.send(savedData)
              })
          
          })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndDelete(bookid)
          .then((data) => {
            if(!data){
              res.send('no book exists')
              return
            }
            res.send('delete successful')
            return;
          })
    });
  
};
