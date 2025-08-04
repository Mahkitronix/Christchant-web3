import UserRepo from './UserRepo'
import ArtistRepo from './ArtistRepo'

class ServiceRepo {
  public userRepo: UserRepo
  public artistRepo: ArtistRepo

  constructor() {
    this.userRepo = new UserRepo()
    this.artistRepo = new ArtistRepo()
  }
}

export default ServiceRepo
