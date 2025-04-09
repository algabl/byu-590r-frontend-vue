import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { temples } from "./temples.module"
const store = createStore({
	modules: {
		auth,
		user,
		temples
	}
})

export default store
