import mongoose from 'mongoose'
import { stringify } from 'node:querystring';
import slugify from 'slugify';

const {
    randomBytes,
    pbkdf2Sync
} = await import('node:crypto');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email',],
  },
  hash: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    trim: true
  },
  description:{
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  salt:{
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: [ 'user', 'student', 'admin' ],
    default: 'user'
  },
  slug:{
    type: String
  },
  about: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  cloudinary_id: {
    type: String,
    select: false
  },
  projects: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    }
  ],
},{
  timestamps: true
})

UserSchema.pre('save', function (next) {
    this.slug = slugify(this.name,
        {
            lower: true,
            replacement: '-',
            trim: true,
            strict: true,
        });
    next();
});

UserSchema.pre('save', function () {
    this.salt = randomBytes(256).toString('hex')
    this.hash = pbkdf2Sync(this.hash, this.salt,
        1000, 64, `sha512`).toString(`hex`);
})

UserSchema.methods.matchPassword = function (password, err) {
    if (password === null) {
        next(err)
    }
    const inputtedPassword = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === inputtedPassword
}

export const User = mongoose.model('User', UserSchema)