import { PROJECT, REVIEW, TOP } from "../utils/paths"
import { Base } from './Base'
import { getToken } from '../utils/token';

class Project extends Base {
  /**
   * @desc Public routes
   */
  get project() {
    return{
      allProjects: (language) => this.get(`${PROJECT}?keyword=${language}`),
      allLanguages: () => this.get(`${PROJECT}/languages`),
      topProjects: () => this.get(`${PROJECT}/${TOP}`),
      singleProject: (id) => this.get(`${PROJECT}/${id}`) 
    }
  }

  /**
   * @desc private routes to manage students projects
   */
  get privateProject(){
    this.setBearerAuth(getToken('token'))
    return {
      createProject: (body) => this.post(`${PROJECT}`, body),
      createReview: (id, body) => this.post(`${PROJECT}/${id}/${REVIEW}`, body),
      updateProject: (id, body) => this.update(`${PROJECT}/${id}`, body),
      deleteProject: (id) => this.delete(`${PROJECT}/${id}`)
    }
  }
}

export default Project = new Project();