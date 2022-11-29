import express from 'express'
const router = express.Router()

import { allUsers, getUser, login, register, removeUser, students, updateUser, user, userRemove } from '../controllers/User.js'

import { protect } from '../middleware/protect.js'
import { authorize } from '../middleware/authorize.js'

router.route('/')
  .get(protect, authorize('admin'), allUsers)
  .get(protect, authorize('user', 'student', 'admin'), user)
  .post(login)
  
router.route('/profile')
  .get(protect, authorize('user', 'student', 'admin'), user)
  .put(protect, authorize('student', 'admin'), updateUser)
  .delete(protect, authorize('user', 'student'), userRemove)

router.route('/register')
  .post(register)

router.route('/students')
  .get(protect, authorize('admin'), students)

router.route('/:id')
  .get(getUser)
  .delete(protect, authorize('student', 'admin'), removeUser)

export default router