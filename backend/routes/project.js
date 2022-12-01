import express from 'express'
const router = express.Router()

import { allProjects, createProject, createReview, deleteProject, getLanguages, getTopProjects, singleProject, updateProject } from '../controllers/project.js'

import { protect } from '../middleware/protect.js'
import { authorize } from '../middleware/authorize.js'

router.route('/')
  .get(allProjects)
  .post(protect, authorize('student', 'admin'), createProject)

  router.route('/languages')
  .get(getLanguages)

router.route('/top')
  .get(getTopProjects)

router.route('/:id')
  .get(singleProject)
  .put(protect, authorize('student'), updateProject)
  .delete(protect, authorize('student', 'admin'), deleteProject)

router.route('/:id/review')
  .post(protect, authorize('user', 'student', 'admin'), createReview)

export default router