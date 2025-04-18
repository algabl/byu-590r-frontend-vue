import { error } from "console"
import templesService from "../services/temples.service"
import { Temple } from "../types"

export interface TemplesState {
	temples: Temple[]
}

const state: TemplesState = {
	temples: []
}

export const temples = {
	namespaced: true,
	state: state,
	actions: {
		getTemples({ commit }) {
			return templesService.getTemples().then(
				(response) => {
					commit("getTemplesSuccess", response)
					return Promise.resolve(response)
				},
				(error) => {
					console.error("Error fetching temples:", error)
					return Promise.reject(error)
				}
			)
		},
		createTemple({ commit }, temple: Temple) {
			return templesService.createTemple(temple).then(
				(response) => {
					commit("createTempleSuccess", response)
					return Promise.resolve(response)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		updateTemple({ commit }, temple: Temple) {
			return templesService.updateTemple(temple).then(
				(response) => {
					commit("updateTempleSuccess", response)
					return Promise.resolve(response)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		deleteTemple({ commit }, id: number) {
			return templesService.deleteTemple(id).then(
				() => {
					commit("deleteTempleSuccess", id)
				},
				(error) => {
					commit("getTemplessFailure")
					console.error("Error deleting temple:", error)
					return Promise.reject(error)
				}
			)
		}
	},
	mutations: {
		getTemplesSuccess(state: TemplesState, temples: Temple[]) {
			state.temples = temples
		},
		getTemplessFailure(state: TemplesState) {
			state.temples = []
		},
		createTempleSuccess(state: TemplesState, temple: Temple) {
			state.temples.push(temple)
		},
		updateTempleSuccess(state: TemplesState, temple: Temple) {
			const index = state.temples.findIndex((t) => t.id === temple.id)
			if (index !== -1) {
				state.temples[index] = temple
			} else {
				state.temples.push(temple)
			}
		},
		deleteTempleSuccess(state: TemplesState, id: number) {
			const index = state.temples.findIndex((t) => t.id === id)
			if (index !== -1) {
				state.temples.splice(index, 1)
			}
		}
	},
	getters: {
		getTemples: (state: TemplesState) => {
			return state.temples
		}
	}
}
