
import { AuthStore } from '../../Authentication/stores'
import { CommuteStore } from '../../Commute/stores/CommuteStore'

import { AuthService } from '../../Authentication/services/AuthService'
import { CommuteService } from '../../Commute/services/CommuteService/CommuteService.js'

const authService = new AuthService()
const authStore = new AuthStore(authService)

const commuteService = new CommuteService()
const commuteStore = new CommuteStore(commuteService)
export default {
   authStore,
   commuteStore
}
