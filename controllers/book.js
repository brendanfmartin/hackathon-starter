/**
 * GET /books
 * List all books
 */

const Book = require('../models/Book.js');

exports.getBooks = (req, res) => {
  Book.find((err, docs) => {
    res.render('account/books', { books: docs });
  })
};

exports.postBooks = (req, res, next) => {
  req.assert('title', 'title not valid');

  const errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors);
    return res.redirect('/books');
  }

  const book = new Book({
    title: req.body.title
  });

  book.save(err => {
    if(err) {
      return next(err);
    }
  })

};