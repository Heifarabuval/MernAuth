const mongoose= require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le titre est obligatoire !"],
        minlength: 3,
        maxlength: 20
    },
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
    },
    updatedAt:{
        type: Date,
       default:null,
    },
    comments:[mongoose.Schema.Types.Mixed]

})

const Post = mongoose.model("Post",PostSchema);

module.exports= Post;