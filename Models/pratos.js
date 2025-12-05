const mongoose = require('mongoose');
const { Schema } = mongoose;

const PratoSchema = new Schema(
  {
    codigo: {
      type: Number,
      required: [true, "O código do prato é obrigatório."],
      unique: true
    },

    nome: {
      type: String,
      required: [true, "O nome do prato é obrigatório."],
      minlength: [3, "O nome deve ter pelo menos 3 caracteres."],
      maxlength: [50, "O nome não pode ter mais de 50 caracteres."],

     
      validate: {
        validator: function (v) {
          return /^[A-Za-zÀ-ÿ\s]+$/.test(v);  
        },
        message: "O nome do prato só pode conter letras."
      }
    },

    categoria: {
      type: String,
      required: [true, "A categoria do prato é obrigatória."],
      minlength: [3, "A categoria deve ter pelo menos 3 caracteres."],
      maxlength: [30, "A categoria não pode ter mais de 30 caracteres."],

      
      enum: {
        values: ["carne", "peixe", "massa", "sobremesa"],
        message: "Categoria inválida. Escolha uma das opcões apresentadas"
      }
    },

    tipo: {
      type: String,
      required: [true, "O tipo é obrigatório."],
      enum: {
        values: ["normal", "vegetariano"],
        message: "Tipo deve ser 'normal' ou 'vegetariano'."
      }
    }
  },

  { timestamps: true }
);


PratoSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Já há um prato com esse código"));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Prato", PratoSchema);
