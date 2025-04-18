<template>
	<!-- Have an add button that opens a v-dialog form -->
	<v-alert v-if="deleteMessage" :type="deleteMessageType" closable>{{
		deleteMessage
	}}</v-alert>
	<v-dialog max-width="500">
		<template v-slot:activator="{ props: createProps }">
			<v-btn prepend-icon="mdi-plus" v-bind="createProps"
				>Add Temple</v-btn
			>
		</template>
		<template v-slot:default="{ isCreateFormActive }">
			<temple-form />
		</template>
	</v-dialog>
	<div class="d-flex flex-wrap justify-center">
		<v-card
			v-for="temple in tableTemples"
			:key="temple.id"
			class="mx-2 my-2"
			width="300"
			height="400"
		>
			<v-img
				v-if="temple.temple_image"
				:src="temple.temple_image"
				height="200px"
				cover
			/>
			<v-icon
				v-else
				icon="mdi-image"
				height="200px"
				class="d-flex align-center justify-center"
				style="width: 100%; height: 200px"
			/>
			<v-card-title>{{ temple.name }}</v-card-title>
			<v-card-subtitle>{{ temple.status }}</v-card-subtitle>
			<v-card-text>
				Longitude: {{ temple.longitude }}<br />
				Latitude: {{ temple.latitude }}
			</v-card-text>
			<v-card-actions>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: eventProps }">
						<v-btn icon="mdi-calendar" v-bind="eventProps" />
					</template>
					<template v-slot:default="{ isActive }">
						<v-card>
							<v-card-title
								>{{ temple.name }} Events</v-card-title
							>
							<v-card-text>
								<v-list>
									<v-list-item
										v-for="event in temple.temple_events"
										:key="event.id"
									>
										<v-list-item-title>
											{{ event.name }}
										</v-list-item-title>
										<v-list-item-subtitle>
											{{
												new Date(
													event.date
												).toLocaleDateString("en-US", {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric"
												})
											}}
										</v-list-item-subtitle>
										<v-list-item-subtitle
											v-if="event.description"
										>
											{{ event.description }}
										</v-list-item-subtitle>
									</v-list-item>
									<v-list-item
										v-if="
											!temple.temple_events ||
											!Array.isArray(
												temple.temple_events
											) ||
											temple.temple_events.length === 0
										"
									>
										<v-list-item-title>
											No events found.
										</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-card-text>
							<v-card-actions>
								<v-btn
									color="primary"
									@click="isActive.value = false"
								>
									Close
								</v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>

				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<v-btn icon="mdi-pencil" v-bind="activatorProps" />
					</template>
					<template v-slot:default="{ isActive }">
						<temple-form :temple="temple" />
					</template>
				</v-dialog>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: deleteProps }">
						<v-btn icon="mdi-delete" v-bind="deleteProps" />
					</template>
					<template v-slot:default="{ isDeleteActive }">
						<v-card>
							<v-card-title
								>Delete {{ temple.name }}?</v-card-title
							>
							<v-card-text>
								Are you sure you want to delete
								{{ temple.name }}?
							</v-card-text>
							<v-card-actions>
								<v-btn
									variant="outlined"
									color="red"
									@click="deleteTemple(temple.id)"
								>
									Delete
								</v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
			</v-card-actions>
		</v-card>
	</div>
	<!-- <v-table>
		<thead>
			<tr>
				<th>Image</th>
				<th>Name</th>
				<th>Longitude</th>
				<th>Latitude</th>
				<th>Status</th>
				<th>Events</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="temple in tableTemples" :key="temple.id">
				<td class="text-center">
					<v-img
						v-if="temple.temple_image"
						:src="temple.temple_image"
					/>
					<v-icon v-else>mdi-image</v-icon>
				</td>
				<td>{{ temple.name }}</td>
				<td>{{ temple.longitude }}</td>
				<td>{{ temple.latitude }}</td>
				<td>{{ temple.status }}</td>
				<td>
					<v-dialog max-width="500">
						<template v-slot:activator="{ props: eventProps }">
							<v-btn icon="mdi-calendar" v-bind="eventProps" />
						</template>
						<template v-slot:default="{ isActive }">
							<v-card>
								<v-card-title
									>{{ temple.name }} Events</v-card-title
								>
								<v-card-text>
									<v-list>
										<v-list-item
											v-for="event in temple.temple_events"
											:key="event.id"
										>
											{{ event.name }} - {{ event.date }}
										</v-list-item>
										<v-list-item
											v-if="
												!temple.temple_events ||
												!Array.isArray(
													temple.temple_events
												) ||
												temple.temple_events.length ===
													0
											"
										>
											No events found.
										</v-list-item>
									</v-list>
								</v-card-text>
								<v-card-actions>
									<v-btn
										color="primary"
										@click="isActive.value = false"
									>
										Close
									</v-btn>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</td>
				<td>
					<v-dialog max-width="500">
						<template v-slot:activator="{ props: activatorProps }">
							<v-btn icon="mdi-pencil" v-bind="activatorProps" />
						</template>
						<template v-slot:default="{ isActive }">
							<temple-form :temple="temple" />
						</template>
					</v-dialog>
					<v-dialog max-width="500">
						<template v-slot:activator="{ props: deleteProps }">
							<v-btn icon="mdi-delete" v-bind="deleteProps" />
						</template>
						<template v-slot:default="{ isDeleteActive }">
							<v-card>
								<v-card-title
									>Delete {{ temple.name }}?</v-card-title
								>
								<v-card-text>
									Are you sure you want to delete the
									{{ temple.name }}?
								</v-card-text>
								<v-card-actions>
									<v-btn
										variant="outlined"
										color="red"
										@click="deleteTemple(temple.id)"
										>Delete</v-btn
									>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</td>
			</tr>
		</tbody>
	</v-table> -->
</template>

<script lang="ts">
import { mapState } from "vuex"
import { Temple } from "../../types"
import TempleForm from "../../components/temple/TempleForm.vue"
import { TemplesState } from "../../store/temples.module"

export default {
	name: "TemplesView",
	components: {
		TempleForm
	},
	computed: {
		tableTemples(): Temple[] {
			// Renamed computed property
			return this.$store.state.temples.temples as Temple[]
		}
	},
	created() {
		this.getTemples()
	},
	methods: {
		getTemples() {
			this.$store.dispatch("temples/getTemples").then((response) => {
				console.log("Temples fetched", response)
			})
		},
		deleteTemple(id: number) {
			this.$store
				.dispatch("temples/deleteTemple", id)
				.then((response) => {
					this.deleteMessageType = "success"
					this.deleteMessage = "Temple deleted successfully"
				})
				.catch((error) => {
					this.deleteMessageType = "error"
					this.deleteMessage = "Error deleting temple"
				})
		}
	},
	data: function () {
		return {
			temple: {
				name: "",
				longitude: "",
				latitude: ""
			},
			imagePreviewUrl: null,
			deleteMessageType: "",
			deleteMessage: ""
		}
	}
}
</script>
