'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
  id: {type: Number, unique: true},
  name: String
})

categorySchema.index({id: 1})

const category = mongoose.model('category', categorySchema)

export default category