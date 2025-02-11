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
			<v-btn @click="forgotPassword()"> Forgot Password </v-btn>
		</div>
	</v-form>
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
