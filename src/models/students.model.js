// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const students = new Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    class: { type: mongooseClient.Schema.Types.ObjectId, ref: 'classes' }, //http://mongoosejs.com/docs/populate.html
    remark: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('students', students);
};
