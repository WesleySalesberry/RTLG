import mongoose from 'mongoose'
import slugify from 'slugify';

const ReviewSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true 
  },
  comment: { 
    type: String, 
    required: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
},
  {
    timestamps: true
  }
)

const ProjectSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title:{
    type: String,
    trim: true,
    unique: [true, "Title already exist"],
    required: [true, 'Project must have a name']
  }, 
  description: {
    type: String,
    required: [true, 'Project must have a description']
  },
  challenges: {
    type: String,
    required: [true, 'Project must have a challenges']
  },
  actions: {
    type: String,
    required: [true, 'Project must have actions']
  },
  language:[{
    type:String,
    required: true,
    trim: true 
  }],
  reviews: [ReviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String
  },
  cloudinary_id: {
    type: String,
    select: false
  },
  slug:{
    type: String,
    select: false
  }
},{
  timestamps: true
})

ProjectSchema.pre('save', function (next) {
    this.slug = slugify(this.title,
        {
            lower: true,
            replacement: '-',
            trim: true,
            strict: true,
        });
    next();
});

export const Project = mongoose.model('Project', ProjectSchema)