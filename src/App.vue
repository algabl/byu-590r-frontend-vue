<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import { mapState } from "vuex"
import { ref } from "vue"
import { VFileUpload } from "vuetify/labs/components"
export default {
	setup() {
		const theme = ref("dark")
		function changeTheme() {
			theme.value = theme.value === "light" ? "dark" : "light"
		}
		return { theme, changeTheme }
	},
	name: "App",
	components: {
		LoginView,
		RouterLink,
		RouterView,
		VFileUpload
	},
	computed: {
		...mapState({
			user() {
				return this.$store.state.user.user
			},
			auth() {
				return this.$store.state.auth
			},
			authUser() {
				return this.auth.user
			},
			isAuthenticated() {
				return (
					this.auth.status.loggedIn &&
					this.authUser.token !== undefined
				)
			},
			title() {
				return "Welcome " + this.authUser.name + "!"
			},
			avatarURL() {
				return this.authUser.avatar
			}
		})
	},
	created() {
		if (this.authUser) {
			this.getCurrentUser()
		}
	},

	updated() {
		// if (this.isAuthenticated) {
		// 	this.$router.push({ name: "home" })
		// }
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout")
		},
		checkAuth(auth) {
			console.log("Authenticated!", auth)
		},
		getCurrentUser() {
			this.profile.name = this.authUser.name

			this.profile.title = this.title
			this.$store.dispatch("user/getUser").then((response) => {
				console.log(response)
				if (response.avatar) {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
				}
				if (!response.email_verified_at) {
					this.showEmailNotVerifiedDialog = true
				}
			})
		},
		removeAvatar() {
			this.removingAvatar = true
			this.$store
				.dispatch("user/removeAvatar")
				.then((response) => {
					this.$store.commit("auth/removeAvatarSuccess")
					this.removingAvatar = false
				})
				.catch((error) => {
					console.error(error)
					alert("Error. Try again")
					this.removingAvatar = false
				})
		},
		onAvatarChange(e) {
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return
			this.profileIsUploading = true
			this.$store
				.dispatch("user/uploadAvatar", image[0], { root: true })
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.error(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		}
	},
	data: function () {
		return {
			profileDialog: false,
			profileIsUploading: false,
			removingAvatar: false,
			verificationEmailLoading: false,
			showEmailNotVerifiedDialog: false,
			showChangeEmailTextField: false,
			changeEmail: false,
			successVerificationMessage: "",
			changeEmailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			profile: {
				avatar: "",
				name: "",
				title: "",
				icon: "mdi-account-circle",
				color: "info"
			},
			profilePictureImage: "",
			emailOfVerification: ""
		}
	},
	watch: {
		isAuthenticated: {
			handler(newValue) {
				if (newValue && this.authUser) {
					this.getCurrentUser()
				}
			}
		}
	}
}
</script>

<template>
	<v-app :theme="theme">
		<v-app-bar
			:title="authUser.name === undefined ? '' : title"
			v-if="isAuthenticated"
		>
			<v-spacer></v-spacer>
			<v-btn to="/" default>Home</v-btn>
			<v-btn to="about">About</v-btn>
			<v-btn to="temples">Temples</v-btn>

			<v-menu>
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-avatar>
							<v-img v-if="avatarURL" :src="avatarURL" />
							<v-icon v-else>mdi-account-circle</v-icon>
						</v-avatar>
					</v-btn>
				</template>
				<v-card>
					<v-card-text>
						<h3>{{ authUser.name }}</h3>
						<v-divider class="my-3"></v-divider>
						<div class="d-flex">
							<v-btn
								variant="text"
								:prepend-icon="
									theme === 'light'
										? 'mdi-weather-sunny'
										: 'mdi-weather-night'
								"
								@click="changeTheme"
								>Toggle Theme</v-btn
							>
							<v-dialog max-width="500">
								<template
									v-slot:activator="{ props: activatorProps }"
								>
									<v-btn
										variant="text"
										v-bind="activatorProps"
										>Profile</v-btn
									>
								</template>
								<template v-slot:default="{ isActive }">
									<v-card>
										<v-card-title>Profile</v-card-title>
										<v-card-text>
											<v-img
												v-if="avatarURL"
												:src="avatarURL"
												width="500"
												height="500"
												class="mx-auto my-10"
											></v-img>
											<v-file-input
												clearable
												@change="onAvatarChange"
												:loading="profileIsUploading"
												:accept="[
													'image/png',
													'image/jpeg'
												]"
											>
											</v-file-input>
											<v-btn
												:disabled="!avatarURL"
												:loading="removingAvatar"
												@click="removeAvatar"
												>Remove Avatar</v-btn
											>
										</v-card-text>
									</v-card>
								</template>
							</v-dialog>
						</div>
						<v-divider class="my-3"></v-divider>

						<v-btn variant="text" @click="logout()">Logout</v-btn>
					</v-card-text>
				</v-card>
			</v-menu>
		</v-app-bar>
		<v-main height="100%" class="overflow-y-auto">
			<v-container>
				<div v-if="isAuthenticated">
					<RouterView />
				</div>
				<LoginView
					v-else
					:is-authenticated="isAuthenticated"
					@authenticate="checkAuth($event)"
				/>
			</v-container>
		</v-main>
	</v-app>
</template>
