const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({

});

let Repo = mongoose.model('Repo', repoSchema);



// {
//   ProductId: Number,
//   Price: Number,
//   Inventory: Number
// }

// {
//   ProductId: Number,
//   Url: String,
//   Category: String,
//   Primary: Boolean,
// }