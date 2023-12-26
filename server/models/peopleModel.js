import mongoose from "mongoose";

const personSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  age : {
    type : Number,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
},
                                     {
                                       timestamps : true,
                                     });

export const Person = mongoose.model("person", personSchema);
