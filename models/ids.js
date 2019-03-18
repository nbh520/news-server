'use strict'
import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
  admin_id: Number, 
  article_id: Number,
  comment_id: Number,
  user_id: Number,
  video_id: Number,
})

const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
  if(!data){
    const newIds = new Ids({
      admin_id: 0,
      article_id: 0,
      comment_id: 0,
      user_id : 0,
      video_id: 0
    })
    newIds.save();
  }
})

export default Ids