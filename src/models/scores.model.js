// scores-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const scores = new Schema({
    date: { type: Date, required: true },
    color_code: { type: String, required: true },
    student: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'students' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('scores', scores);
};
