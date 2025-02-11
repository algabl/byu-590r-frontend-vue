import { computed } from "vue"

export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: function () {
		return {
			isAuthenticated: false,
			username: "",
			password: "",
			valid: false,
			messageType: "",
			message: "",
			loading: false
		}
	},
	methods: {
		async submitLogin() {
			const { valid } = await this.$refs.form.validate()
			if (valid) {
				if (this.username == this.password) {
					this.messageType = "warning"
					this.message =
						"Your username and password can not be the same."
					return
				} else if (
					// this.username != "admin" &&
					this.password != "password"
				) {
					this.messageType = "error"
					this.message = "Login failed."
					return
				}

				this.messageType = "success"
				this.message = "Login Success Redirecting!"
				this.isAuthenticated = true
				setTimeout(() => {
					this.$emit("authenticate", this.isAuthenticated)
				}, 3000)
			}
		},
		eightChar(value: string) {
			console.log("eightChar")
			return (
				value.length >= 8 || "Password must be at least 8 characters."
			)
		},
		required(value: string) {
			return !!value || "This field is required."
		},
		forgotPassword() {
			console.log("Forgot password")
		}
	},
	computed: {
		validPassword() {
			return this.password.length > 0
		}
	}
}
