const mongoose = require('mongoose')
const db = mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const BookSchema = new mongoose.Schema({
    title: String,
    comments: [String]
});

const BookModel = mongoose.model('BookModel', BookSchema);
module.exports = {
    db,
    BookModel
}