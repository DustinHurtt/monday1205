var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {

  let number = 6 + 2
  let newNumber = number * 2

  let biggerNumber = new Promise((resolve) => {
      setTimeout(() => {
        resolve(newNumber * 2)
      }, 4000)
  })
  // console.log(biggerNumber(newNumber))
  biggerNumber.then((result) => {
    console.log("This is the result", result)
    res.render('index', {number, newNumber, result})
  })
  .catch((err) => { console.log(err)})
  // res.render('index', { title: 'Express', number: number, newNumber: newNumber });
});

router.get('/countries', (req, res, next) => {

  axios.get('https://ih-countries-api.herokuapp.com/countries')
    .then((results) => {
      res.render('countries.hbs', {foundCountries: results.data})
    })
    .catch((err) => {
      console.log(err)
    })
})


router.get('/async', async (req, res, next) => {

  try {
    let results = await axios.get('https://ih-countries-api.herokuapp.com/countries')
    res.render('countries.hbs', {foundCountries: results.data})
  } catch (err) {
    console.log(err)
  }

})



module.exports = router;
