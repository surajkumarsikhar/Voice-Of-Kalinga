// createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/admin');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

const createAdmin = async () => {
  const username = 'suraj';
  const password = 'rajvok@101';

  try {
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new Admin({ username, password });
    await admin.save();
    console.log('✅ Admin created:', admin.username);
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit();
  }
};

createAdmin();
