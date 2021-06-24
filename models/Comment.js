const mongoose= require('mongoose');

const CommentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: [true, "Le contenu est obligatoire !"],
        minlength: 5
    },
    userId:{
        type: String,
        required: [true, "L'ID utilisateur est obligatoire !"],
    },
    createdAt:{
        type: Date,
        required:[true, "La date est obligatoire"]
    }

})

const Comment = mongoose.model("Comment",CommentSchema);

module.exports= Comment;