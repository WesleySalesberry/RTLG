import { REGISTER, STUDENT, USER, PROFILE } from '../utils/paths';
import { getToken } from '../utils/token';
import { Base } from './Base'

class User extends Base {
  get user() {
    return{
      register: (body) => this.post(`${USER}/${REGISTER}`, body),
      login: (body) => this.post(`${USER}`, body),
      getSingleUser: (id) => this.get(`${USER}/${id}`)
    }
  }

  /**
   * @desc Used by only the logged in users.
   * @returns Nothing
   */
  get privateUser(){

    this.setBearerAuth(getToken('token'))

    return {
      userProfile: () => this.get(`${USER}/${PROFILE}`),
      updateUser: (id, body) => this.update(`${USER}/${id}`, body),
      deleteUser: (id) => this.delete(`${USER}/${id}`)
    }
  }

  /**
   * @desc Used by only the logged in admin users.
   * 
   */
  get admin(){
    this.setBearerAuth(getToken('token'))
    return {
      getUsers: () => this.get(`${USER}`),
      getStudents: () => this.get(`${USER}/${STUDENT}`)
    }
  }
}

export default User = new User();