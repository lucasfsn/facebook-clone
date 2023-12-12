import 'dotenv/config';
import { Router } from 'express';
import * as UserController from '../controllers/user';

export const userRouter = Router()
  .get('/profile/:username', UserController.getUserProfile)
  .post('/signup', UserController.signUp)
  .post('/login', UserController.login)
  .patch('/change-password', UserController.changePassword)
  .put('/change/:data', UserController.changeUserInfo)
  .delete('/delete/:id', UserController.deleteUser)
  .patch('/profile/updatePicture', UserController.updateProfileImage)
  .patch('/profile/updateCover', UserController.updateCoverImage)
  .delete('/profile/:id/removeCover', UserController.removeCoverPhoto)
  .delete('/profile/:id/removePicture', UserController.removeProfilePicture)
  .patch('/profile/updateDetails', UserController.updateDetails)
  .post('/profile/:id/add', UserController.addFriend)
  .put('/profile/:id/cancel', UserController.cancelFriendRequest)
  .put('/profile/:id/accept', UserController.acceptFriendRequest)
  .delete('/profile/:id/remove', UserController.removeFriend)
  .delete('/profile/:id/removeRequest', UserController.removeFriendRequest)
  .get('/user/:id', UserController.getUserById);
