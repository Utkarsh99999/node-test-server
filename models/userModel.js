import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  company: String,
  address: String,
  age: Number,
  gender: String,
  birthday: Date,
  city: String,
  country: String,
  education: String,
  occupation: String,
  skills: [String],
  interests: [String],
  membership: String,
  status: String,
  lastLogin: Date,
  joinedDate: Date,
  favoriteColor: String,
  favoriteFood: String,
  height: String,
  weight: String,
  bloodType: String
});

const User = mongoose.model('User', userSchema);

export default User;
