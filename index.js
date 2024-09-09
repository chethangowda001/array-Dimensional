

const express = require('express');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));


let array = Array.from({ length: 100 }, (_, i) => i + 1); 
let shuffledArray = shuffle([...array]); 


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


app.get('/', (req, res) => {
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shuffled Array</title>
    </head>
    <body>
      <h1>Array Shuffling with Fisher-Yates Algorithm</h1>
      <p><strong>Original Array:</strong> ${array.join(', ')}</p>
      <p><strong>Shuffled Array:</strong> ${shuffledArray.join(', ')}</p>

     
      <form action="/shuffle" method="POST">
        <button type="submit">Shuffle Again</button>
      </form>

      <!-- Form to get element at a specific index -->
      <form action="/get-element" method="POST">
        <label for="index">Enter the index of the element you want to see : </label>
        <input type="number" id="index" name="index" min="0" max="${shuffledArray.length - 1}" required>
        <button type="submit">Get Element</button>
      </form>
    </body>
    </html>
  `);
});


app.post('/shuffle', (req, res) => {
  shuffledArray = shuffle([...array]);
  res.redirect('/'); 
});


app.post('/get-element', (req, res) => {
  const index = parseInt(req.body.index, 10); 
  let element;

  
  if (index >= 0 && index < shuffledArray.length) {
    element = shuffledArray[index];
  } else {
    element = 'Invalid index. Please enter a number within the valid range.';
  }

  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shuffled Array - Element Display</title>
    </head>
    <body>
      <h1>Element at Index ${index}</h1>
      <p><strong>Requested Element:</strong> ${element}</p>
      <a href="/">Back to Shuffle</a>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
