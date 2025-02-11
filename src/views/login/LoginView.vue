<template>
	<h1>Welcome</h1>
	<v-form class="login" ref="form" v-model="valid" lazy-validation>
		<v-text-field label="Username" v-model="username" :rules="[required]" />
		<v-text-field
			label="Password"
			v-model="password"
			:type="'password'"
			:rules="[eightChar, required]"
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
							<v-btn @click="isActive.value = false">Close</v-btn>
							<v-btn>Submit</v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
		</div>
	</v-form>
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
