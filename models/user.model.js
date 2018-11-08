const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: false }
}, {
  timestamps: {
    createAt: 'createAt',
    updateAt: 'updateAt'
  }
}
})


const User = mongoose.model('user', UserSchema)
module.exports = User
module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Hashing failed', error)
  }
}

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword)
  } catch (error) {
    throw new Error('Comparing failed', error)
  }
}
