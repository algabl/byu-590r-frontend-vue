import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"
import { Temple } from "../types"
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
		formData.append("_method", "PUT")
		console.log("formData", formData)
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

		console.log("formData", formData)

		return axios
			.post(API_URL + "/temples", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
}

const templesService = new TemplesService()
export default templesService
