<template>
	<v-card>
		<v-card-title>{{ title }}</v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field
					label="Name"
					v-model="tempTemple.name"
					:rules="[required]"
				/>
				<v-text-field
					label="Longitude"
					v-model="tempTemple.longitude"
					:rules="[isType(tempTemple.longitude || 0, 'number')]"
				/>
				<v-text-field
					label="Latitude"
					v-model="tempTemple.latitude"
					:rules="[isType(tempTemple.latitude || 0, 'number')]"
				/>
				<v-text-field
					label="Status"
					v-model="tempTemple.status"
					:rules="[required]"
				/>
				<v-number-input
					:reverse="false"
					controlVariant="default"
					label="Walk Score"
					v-model="tempTemple.walk_score"
					:hideInput="false"
					:inset="false"
				></v-number-input>
				<v-number-input
					label="Bike Score"
					v-model="tempTemple.bike_score"
				/>
				<v-number-input
					label="Transit Score"
					v-model="tempTemple.transit_score"
				/>
				<v-text-field
					label="Architect"
					v-model="tempTemple.temple_details.architect"
				/>
				<v-number-input
					label="Square Footage"
					v-model="tempTemple.temple_details.square_footage"
				/>
				<v-number-input
					label="Number of Ordinance Rooms"
					v-model="tempTemple.temple_details.number_ordinance_rooms"
				/>
				<v-number-input
					label="Number of Sealing Rooms"
					v-model="tempTemple.temple_details.number_sealing_rooms"
				/>
				<v-number-input
					label="Number of Surface Parking Spots"
					v-model="
						tempTemple.temple_details.number_surface_parking_spots
					"
				/>
				<v-text-field
					label="Additional Notes"
					v-model="tempTemple.temple_details.additional_notes"
				/>
				<v-img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
				<v-img
					v-else="temple.temple_image"
					:src="tempTemple.temple_image"
				/>
				<v-file-input
					clearable
					@change="onTempleImageChange($event, tempTemple)"
					label="Temple Image"
					accept="image/*"
				/>
			</v-form>

			<v-alert v-if="message" :type="messageType">
				{{ message }}
			</v-alert>
		</v-card-text>
		<v-card-actions>
			<v-btn
				variant="elevated"
				color="primary"
				:disabled="formIsLoading"
				@click="saveTemple(tempTemple)"
			>
				<v-progress-circular
					v-if="formIsLoading"
					indeterminate
					color="white"
				></v-progress-circular>
				<span v-if="!formIsLoading">Save</span></v-btn
			>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { mapState } from "vuex"
import { Temple, TempleEvent } from "../../types"
import { title } from "process"
import { isType, required } from "../../validation"
import { rules } from "eslint-plugin-vue"
// optional

export default {
	name: "TempleForm",
	components: {},
	props: {
		temple: {
			type: Object as () => Temple,
			required: false
		}
	},
	computed: {
		...mapState({}),
		title(): string {
			return this.temple === undefined ? "Add Temple" : "Edit Temple"
		}
	},
	created() {
		if (this.temple !== undefined) {
			this.tempTemple = { ...this.temple }
		} else {
			this.tempTemple = {
				id: 0,
				name: "",
				temple_image: "",
				longitude: 0,
				latitude: 0,
				status: "",
				walk_score: 0,
				bike_score: 0,
				transit_score: 0,
				created_at: "",
				updated_at: "",
				deleted_at: "",
				temple_events: [] as TempleEvent[],
				temple_details: {
					id: 0,
					temple_id: 0,
					architect: "",
					description: "",
					square_footage: 0,
					number_ordinance_rooms: 0,
					number_sealing_rooms: 0,
					number_surface_parking_spots: 0,
					additional_notes: "",
					created_at: "",
					updated_at: "",
					deleted_at: ""
				}
			}
		}
	},
	emits: ["close"],
	methods: {
		saveTemple(temple: Temple) {
			this.formIsLoading = true
			if (this.temple !== undefined) {
				this.updateTemple(temple)
			} else {
				this.createTemple(temple)
			}
		},
		createTemple(temple: Temple) {
			this.$store
				.dispatch("temples/createTemple", temple)
				.then((response) => {
					console.log("Temple created", response)
					this.message = "Temple created successfully"
					this.messageType = "success"
				})
				.catch((error) => {
					this.message = "Error creating temple"
					this.messageType = "error"
					console.error("Error creating temple:", error)
				})
				.finally(() => {
					this.formIsLoading = false
				})
		},
		updateTemple(temple: Temple) {
			console.log("Temple updating", temple)
			this.$store
				.dispatch("temples/updateTemple", temple)
				.then((response) => {
					console.log("Temple updated", response)
					this.message = "Temple updated successfully"
					this.messageType = "success"
				})
				.catch((error) => {
					this.message = "Error updating temple"
					this.messageType = "error"
					console.error("Error updating temple:", error)
				})
				.finally(() => {
					this.formIsLoading = false
				})
		},
		onTempleImageChange(event: Event, temple: Temple) {
			const file = (event.target as HTMLInputElement)?.files?.[0]
			if (file) {
				// Create a preview URL
				this.imagePreviewUrl = URL.createObjectURL(file)

				// Store the file in the temple object (optional, if you need it later)
				this.tempTemple.temple_image = file
				console.log("temple_image", this.tempTemple)
			} else {
				this.imagePreviewUrl = null // Clear the preview if no file is selected
				this.tempTemple.temple_image = null
			}
		},
		required,
		isType
	},
	data: function () {
		return {
			tempTemple: {
				id: 0,
				name: "",
				temple_image: "",
				longitude: 0,
				latitude: 0,
				status: "",
				walk_score: 0,
				bike_score: 0,
				transit_score: 0,
				created_at: "",
				updated_at: "",
				deleted_at: "",
				temple_events: [] as TempleEvent[],
				temple_details: {
					id: 0,
					temple_id: 0,
					architect: "",
					description: "",
					square_footage: 0,
					number_ordinance_rooms: 0,
					number_sealing_rooms: 0,
					number_surface_parking_spots: 0,
					additional_notes: "",
					created_at: "",
					updated_at: "",
					deleted_at: ""
				}
			} as Temple,
			imagePreviewUrl: null,
			formIsLoading: false,
			messageType: "",
			message: ""
		}
	}
}
</script>
