<template>
	<div class="login">
		<h1>Welcome</h1>
		<v-form ref="form" class="login-form" v-model="valid" lazy-validation>
			<v-text-field
				label="Username"
				v-model="username"
				:rules="[characterCount(3, username), required]"
			/>
			<v-text-field
				label="Password"
				v-model="password"
				:type="'password'"
				:rules="[characterCount(8, password), required]"
			/>
			<v-alert v-if="message" :type="messageType">{{ message }}</v-alert>
			<div class="login-buttons">
				<v-btn
					:disabled="!valid"
					:loading="isAuthenticated"
					@click="submitLogin()"
				>
					Login Here
				</v-btn>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<v-btn v-bind="activatorProps">Forgot Password</v-btn>
					</template>
					<template v-slot:default="{ isActive }">
						<v-card class="forgot-password">
							<v-card-title>Forgot Password</v-card-title>
							<v-card-text>
								<v-text-field label="Email" />
							</v-card-text>
							<v-card-actions>
								<v-btn @click="isActive.value = false"
									>Close</v-btn
								>
								<v-btn>Submit</v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
			</div>
		</v-form>
	</div>
</template>
<script lang="ts">
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
		characterCount(count: number, value: string) {
			console.log("eightChar")
			return (
				value.length >= count ||
				`Password must be at least ${count} characters.`
			)
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
