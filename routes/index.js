const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books')
});

router.get('/books', async (req,res) => {
  const books = await Book.findAll()
  res.render('books', {
    title: 'Books',
    books: books,
    links: Math.ceil(books.length / 10)
  })
})

router.get('/books/new', (req,res)=> {
  res.render('new-book')
})

router.post('/books/new', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.redirect('/books')
  } catch(e){
    const error = e.message.slice(17);
    res.render('new-book', {error})
  }
})

router.get('/books/:id', async (req,res)=>{
  try{
    const book = await Book.findByPk(req.params.id)
    res.render('update-book', {book})
  } catch(e){
    console.log(e)
  }
})

router.post('/books/:id', async (req,res)=>{
  try{
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body)
    res.redirect('/books')
  }catch(e){
    const error = e.message.slice(17);
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', {book, error})
  }
})


router.post('/books/:id/delete', async (req,res)=>{
  try{
    const book = await Book.findByPk(req.params.id);
    console.log(book)
    await book.destroy();
    res.redirect('/')
  }catch(e){
    res.status(400).send();
  }
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.render('error')
})

router.use(function (req, res, next) {
  res.render('404')
})




module.exports = router;
