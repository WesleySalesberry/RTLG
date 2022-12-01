import { Project } from '../models/Project.js'
import { User } from '../models/User.js'
import cloudinary from '../configs/cloudinary.js'

/**
 * @desc Fetch all projects
 * @route GET /api/v1/project
 * @access Public
 */
export const allProjects = async (req, res, next) => {

  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
        ? {
            language: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : ''

  const count = await Project.countDocuments({ ...keyword })
  const projects = await Project.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate({
      path: 'student',
      select: "-hash -salt -role -projects -image -description"
    }).select('+slug').select('+language')

  res.status(200).json({
    success: true,
    count: count,
    data: projects
  })
}

/**
 * @desc Fetch top projects
 * @route GET /api/v1/project/top
 * @access Public
 */
export const getTopProjects = async (req, res, next) => {

    const projects = await Project.find({}).sort({ rating: -1 }).limit(3).populate({
      path: 'student',
      select: "-hash -salt -role"
    }).select('+slug')

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    })
}

/**
 * @desc Fetch single project
 * @route GET /api/v1/project/:id
 * @access Public
 */
export const singleProject = async (req, res, next) => {
  const project = await Project.findById({ _id: req.params.id }).populate({
    path: 'student',
    select: "-hash -salt -role -projects -description"
  })

  res.status(200).json({
    success: true,
    data: project
  })
}

/**
 * @desc Add a project
 * @route GET /api/v1/project
 * @access Private
 */
export const createProject = async (req, res, next) => {
  try {
    if(req.files !== null){
      const projectImage = req.files.image
      if(!projectImage.mimetype.startsWith("image")){
        res.status(401).json({
          success: false,
          message: "Not an image"
        })
      }
      
      const response = await cloudinary.uploader.upload(
        projectImage.tempFilePath, 
          {height: 250, width: 250, crop: "fill"}, 
          (err) => console.log(`Error in cloudinary`, err)
        )

      
        req.body.image = response.secure_url,
        req.body.cloudinary_id = response.public_id
      }

    req.body.student = req.user.id 
    const lang = req.body.language.split(',')
    delete req.body.language

    const project = await Project.create(req.body)

    for(let x = 0; x < lang.length; x++){
      await Project.findByIdAndUpdate({_id: project._id},{
      $push: {
        language: lang[x]
      }
    })
    }

    await User.findByIdAndUpdate({ _id: req.user._id},{
      $push: {
        projects: project._id
      }
    })

    res.status(201).json({
      success: true,
      data: "Your Project Has Been Added"
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @desc Update a project
 * @route GET /api/v1/project/:id
 * @access Private
 */
export const updateProject = async (req, res, next) => {
  try {
    await Project.findByIdAndUpdate({ _id: req.params.id}, req.body)
    res.status(201).json({
      success: true,
      data: "Your project has been updated"
    })  
  } catch (error) {
    console.log(error)
  }
}

/**
 * @desc Delete a project
 * @route GET /api/v1/project/:id
 * @access Private/Student
 */
export const deleteProject = async (req, res, next) => {
  try {

    console.log(req.params.id)
    User.findByIdAndUpdate(req.user._id, {
      $pull: {
        projects: req.params.id
      },
    }, (error) => {
      if(error) console.log(error)
    })


    await Project.findByIdAndRemove({ _id: req.params.id })

    res.status(200).json({
      success: true,
      data: "Project deleted"
    })
  } catch (error) {
    console.log(error)
  }
  
}

/**
 * @desc Create project Review
 * @route GET /api/v1/project/:id/review
 * @access Public
 */
export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body
    const project = await Project.findById(req.params.id)

    if (project) {
        const alreadyReviewed = project.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Project already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        project.reviews.push(review)

        project.numReviews = project.reviews.length

        project.rating =
            project.reviews.reduce((acc, item) => item.rating + acc, 0) /
            project.reviews.length

        await project.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('project not found')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * @desc Fetch all languages
 * @route GET /api/v1/project/languages
 * @access Public
 */

export const getLanguages = async (req, res, next) => {
  try {
    const project = await Project.find({}, {
      language: 1,
      _id: 1
    })

    res.status(201).json({
      success: true,
      data: project
    }) 

  } catch (error) {
    next(error)
  }
}
