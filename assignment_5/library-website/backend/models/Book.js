const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
        index: true
    },
    subject: {
        type: String,
        required: true,
        minlength: 6
    },
    edition: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    numberOfCopies: {
        type: String,
        required: true
    }
});

// Override `toJSON` method to populate an `id` attribute from `_id`
bookSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Book', bookSchema);
