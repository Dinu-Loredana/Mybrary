const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

// All Authors route
router.get('/', async (req, res) => {    
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
        searchOptions: req.query
        })    
    } catch (error) {
        res.redirect('/')
    }
})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() }) 
    //{author: new Author()} => this variable creates an obj which can be used into ejs file, create a new author which can be use to create/send/update/delete things into db, it does not save it
})

// Create Author Route
//route is: 'authors/ - related to form
router.post('/', async (req, res) => {
    const author = new Author({name: req.body.name})

    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
         res.redirect('authors')
    } catch (err) {
        res.render('authors/new', {
                        author: author,
                        errorMessage: 'Error creating author'
                    })
    }
})

module.exports = router

// old way, wt try/catch block
  // const author = new Author({name: req.body.name})
    // let locals= { errorMessage: 'Error creating author'}
    // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', {
    //             author: author,
    //             locals
    //         })
    //     } else {
    //         //res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect('authors')
    //     }

    // create new author with that name and sent it to db
    //req.body.name => name obj from the form sent with post method
    //   res.send(req.body.name)