import { User } from '../models/User.js'
import { Project } from '../models/Project.js'
import generateToken from '../utils/token.js'

import cloudinary from '../configs/cloudinary.js'


/**
 * @desc   Post Login
 * @route  POST /api/v1/user
 * @access Public
**/
export const login = async (req, res, next) => {
  try {
    const { email, hash } = req.body

    const user = await User.findOne({ email: email })

    if(!user){
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const match = await user.matchPassword(hash)

    if(!match){
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // const person = await User.findById({ _id: user.id }).select('-hash').select('-salt').select('-projects').select('-slug')

    res.status(201).json({
      success: true,
      token: generateToken(user._id, user.role)
    })

  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Returns all users or by keyword
 * @route  GET /api/v1/user?keyword=
 * @route  GET /api/v1/user?keyword=student
 * @route  GET /api/v1/user?keyword=user
 * @route  GET /api/v1/user?keyword=admin
 * @access Public
 */
export const allUsers = async (req, res, next) => {

  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
        ? {
            role: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : ''

  const count = await User.countDocuments({ ...keyword })
  const projects = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .select("-hash").select("-salt").select("-projects").select("-image").select("-language").select("-description")

  res.status(200).json({
    success: true,
    count: count,
    data: projects
  })
}

/**
 * @desc   Post a new user
 * @route  POST /api/v1/user/register
 * @access Public
**/
export const register = async (req, res, next) => {
  try {
    await User.create(req.body)
    res.status(201).json({
      success: true
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Returns a single user
 * @route  GET /api/v1/user/:id
 * @access Public
**/
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id}).select('-hash').select('-salt').select('-role').populate('projects')
    
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Returns user data
 * @route  GET /api/v1/user/profile
 * @access Private/User
**/
export const user = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-hash').select('-salt').select('-role').populate('projects')

    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Updates a user
 * @route  GET /api/v1/student/update/profile
 * @access Student
**/
export const updateUser = async (req, res, next) => {
  console.log(req.body)
  try {
    if(req.files !== null){
      const userImage = req.files.image

      if(!userImage.mimetype.startsWith("image")){
        res.status(401).json({
          success: false,
          message: "Not an image"
        })
      }
      
      const response = await cloudinary.uploader.upload(
        userImage.tempFilePath, 
          {height: 250, width: 250, crop: "fill"}, 
          (err) => console.log(`Error in cloudinary`, err)
        )

      
        req.body.image = response.secure_url,
        req.body.cloudinary_id = response.public_id
      }

      await User.findByIdAndUpdate( req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: "User has been updated"
      })
  } catch (error) {
    next(error) 
  }
}

/**
 * @desc   Deletes a user
 * @route  GET /api/v1/user/:id
 * @access Admin
**/
export const removeUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id })

    if(!user){
      return res.status(401).json({
        success: false,
        message: 'User not found'
      }) 
    }

    for(let x = 0; x < user.projects.length; x++){
      await Project.findByIdAndRemove({ _id: user.projects[x]._id })
    }

    await User.findByIdAndRemove({ _id: req.params.id })

    res.status(201).json({
      success: true,
      data: "User deleted"
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Use when a user/student wants to delete their profile
 * @route  GET /api/v1/user/profile
 * @access Student/User
**/
export const userRemove = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    if(!user){
      return res.status(401).json({
        success: false,
        message: 'User not found'
      }) 
    }

    for(let x = 0; x < user.projects.length; x++){
      await Project.findByIdAndRemove({ _id: user.projects[x]._id })
    }

    await User.findByIdAndRemove({ _id: req.user._id })

    res.status(201).json({
      success: true,
      data: "User deleted"
    })
  } catch (error) {
    next(error)
  }
}
