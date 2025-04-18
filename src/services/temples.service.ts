import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"
import { Temple, TempleEvent } from "../types"
class TemplesService {
	async getTemples() {
		return axios
			.get(API_URL + "/temples", { headers: authHeader() })
			.then((response) => {
				console.log(response.data.data)
				return response.data.data
			})
	}
	async updateTemple(temple: Temple) {
		console.log("temple", temple)
		let formData = new FormData()
		if (temple.temple_image instanceof File) {
			formData.append("temple_image", temple.temple_image)
		} else if (typeof temple.temple_image === "string") {
			formData.append("temple_image", temple.temple_image)
		}
		formData.append("name", temple.name)
		formData.append("latitude", temple.latitude.toString())
		formData.append("longitude", temple.longitude.toString())
		formData.append("status", temple.status)
		formData.append("walk_score", temple.walk_score.toString())
		formData.append("bike_score", temple.bike_score.toString())
		formData.append("transit_score", temple.transit_score.toString())
		if (temple.temple_details) {
			formData.append(
				"temple_details[architect]",
				temple.temple_details.architect
			)
			formData.append(
				"temple_details[square_footage]",
				temple.temple_details.square_footage.toString()
			)
			formData.append(
				"temple_details[number_ordinance_rooms]",
				temple.temple_details.number_ordinance_rooms.toString()
			)
			formData.append(
				"temple_details[number_sealing_rooms]",
				temple.temple_details.number_sealing_rooms.toString()
			)
			formData.append(
				"temple_details[number_surface_parking_spots]",
				temple.temple_details.number_surface_parking_spots.toString()
			)
			formData.append(
				"temple_details[additional_notes]",
				temple.temple_details.additional_notes
			)
		}
		formData.append("_method", "PUT")
		return axios
			.post(API_URL + "/temples/" + temple.id, formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
	async deleteTemple(id: number) {
		return axios
			.delete(API_URL + "/temples/" + id, { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
	async createTemple(temple: Temple) {
		let formData = new FormData()

		// Append the image file if it exists and is a File object
		if (temple.temple_image instanceof File) {
			formData.append("temple_image", temple.temple_image)
		}

		formData.append("name", temple.name)
		formData.append("latitude", temple.latitude.toString())
		formData.append("longitude", temple.longitude.toString())
		formData.append("status", temple.status)
		formData.append("walk_score", temple.walk_score.toString())
		formData.append("bike_score", temple.bike_score.toString())
		formData.append("transit_score", temple.transit_score.toString())
		if (temple.temple_details) {
			formData.append(
				"temple_details[architect]",
				temple.temple_details.architect
			)
			formData.append(
				"temple_details[square_footage]",
				temple.temple_details.square_footage.toString()
			)
			formData.append(
				"temple_details[number_ordinance_rooms]",
				temple.temple_details.number_ordinance_rooms.toString()
			)
			formData.append(
				"temple_details[number_sealing_rooms]",
				temple.temple_details.number_sealing_rooms.toString()
			)
			formData.append(
				"temple_details[number_surface_parking_spots]",
				temple.temple_details.number_surface_parking_spots.toString()
			)
			formData.append(
				"temple_details[additional_notes]",
				temple.temple_details.additional_notes
			)
		}

		console.log("formData", formData)

		return axios
			.post(API_URL + "/temples", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
	async deleteEvent(eventId: number) {
		return axios
			.delete(API_URL + `/temple-events/${eventId}`, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}
	async updateEvent(event: TempleEvent) {
		let formData = new FormData()
		console.log("event", event)
		formData.append("name", event.name)
		formData.append("date", event.date)
		if (event.description) formData.append("description", event.description)
		formData.append("_method", "PUT")
		return axios
			.post(API_URL + "/temple-events/" + event.id, formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
	async createEvent(templeId: number, event: TempleEvent) {
		console.log("event", event)

		let formData = new FormData()
		formData.append("temple_id", templeId.toString())
		formData.append("name", event.name)
		formData.append("date", event.date)
		if (event.description) formData.append("description", event.description)
		return axios
			.post(API_URL + "/temple-events", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
}

const templesService = new TemplesService()
export default templesService
