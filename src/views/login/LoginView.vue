<template>
	<div class="login">
		<h1>Welcome</h1>
		<v-form ref="form" class="login-form" v-model="valid" lazy-validation>
			<v-text-field
				label="Email"
				v-model="email"
				:rules="[
					characterCount(3, email),
					required,
					emailAndPassMatch(email, password)
				]"
			/>
			<v-text-field
				label="Password"
				v-model="password"
				:type="'password'"
				:rules="[
					characterCount(10, password),
					required,
					emailAndPassMatch(email, password)
				]"
			/>
			<v-alert v-if="message" :type="messageType">{{ message }}</v-alert>
			<div class="login-buttons">
				<v-btn
					v-if="!isAuthenticated"
					:disabled="!valid"
					:loading="loading"
					@click="submitLogin()"
				>
					Login Here
				</v-btn>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<v-btn v-bind="activatorProps">Forgot Password?</v-btn>
					</template>
					<template v-slot:default="{ isActive }">
						<v-card class="forgot-password">
							<v-card-title>Forgot Password</v-card-title>
							<v-card-text>
								<v-form
									ref="forgotPasswordForm"
									v-model="passwordResetFormIsValid"
								>
									<v-text-field
										label="Email"
										v-model="forgotPasswordEmail"
										:rules="[isEmail(forgotPasswordEmail)]"
									/>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-btn @click="isActive.value = false"
									>Close</v-btn
								>
								<v-btn
									variant="text"
									:loading="submitForgotPasswordLoading"
									:disabled="!passwordResetFormIsValid"
									@click="submitForgotPassword()"
									>Submit</v-btn
								>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<v-btn v-bind="activatorProps">Register</v-btn>
					</template>
					<template v-slot:default="{ isActive }">
						<v-card class="register">
							<v-card-title>Register</v-card-title>
							<v-card-text>
								<v-form
									ref="registerForm"
									v-model="isRegisterFormValid"
								>
									<v-text-field
										label="Name"
										v-model="register.name"
									/>
									<v-text-field
										label="Email"
										v-model="register.email"
										:rules="[isEmail(register.email)]"
									/>
									<v-text-field
										label="Password"
										v-model="register.password"
										:type="'password'"
										:rules="[
											characterCount(
												10,
												register.password
											)
										]"
									/>
									<v-text-field
										label="Confirm Password"
										v-model="register.c_password"
										:type="'password'"
										:rules="[
											passwordMatch(
												register.password,
												register.c_password
											)
										]"
									/>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-btn @click="isActive.value = false"
									>Close</v-btn
								>
								<v-btn
									@click="submitRegister()"
									:disabled="!isRegisterFormValid"
									:loading="registerFormIsLoading"
									>Submit</v-btn
								>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
			</div>
		</v-form>
	</div>
</template>
<script lang="ts">
export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: function () {
		return {
			isAuthenticated: false,
			email: "",
			password: "",
			valid: false,
			messageType: "",
			message: "",
			loading: false,
			isRegisterFormValid: false,
			registerFormIsLoading: false,
			register: {
				name: "",
				email: "",
				password: "",
				c_password: ""
			},
			submitForgotPasswordLoading: false,
			passwordResetFormIsValid: false,
			forgotPasswordEmail: ""
		}
	},
	methods: {
		async submitLogin() {
			this.loading = true
			if (!this.valid) {
				return
			}

			const user = {
				email: this.email,
				password: this.password
			}
			this.message = ""
			this.loading = true
			this.$store.dispatch("auth/login", user).then(
				() => {
					this.loading = false
					this.isAuthenticated = true
					this.messageType = "success"
					this.message = "Login successful. Redirecting..."
					this.$router.push({ name: "home" })
				},
				(error) => {
					this.loading = false
					this.messageType = "error"
					this.message =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},
		async submitRegister() {
			if (!this.isRegisterFormValid) {
				return
			}

			const register = {
				name: this.register.name,
				email: this.register.email,
				password: this.register.password,
				c_password: this.register.c_password
			}

			this.registerFormIsLoading = true
			this.$store.dispatch("auth/register", register).then(
				() => {
					alert("success")
					this.registerFormIsLoading = false
					this.registerDialog = false
				},
				(error) => {
					this.registerFormIsLoading = false
					alert("error")
				}
			)
		},
		async submitForgotPassword() {
			this.submitForgotPasswordLoading = true
			this.$store
				.dispatch("auth/forgotPassword", this.forgotPasswordEmail)
				.then(
					() => {
						alert("success")
						this.submitForgotPasswordLoading = false
						this.passwordResetDialog = false
					},
					(error) => {
						this.submitForgotPasswordLoading = false
						alert("error")
					}
				)
		},
		characterCount(count: number, value: string) {
			return (
				value.length >= count ||
				`Password must be at least ${count} characters.`
			)
		},
		emailAndPassMatch(email: string, password: string) {
			return (
				email != password || "Email and password can not be the same."
			)
		},
		isEmail(value: string) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			return emailRegex.test(value) || "Email must be valid."
		},
		passwordMatch(password: string, confirmPassword: string) {
			return password === confirmPassword || "Passwords do not match."
		},
		required(value: string) {
			return !!value || "This field is required."
		},
		forgotPassword() {
			console.log("Forgot password")
		}
	}
}
</script>
<style src="./LoginView.scss" />
