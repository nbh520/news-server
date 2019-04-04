'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
  id: {type: Number, unique: true},
  name: Number,
})