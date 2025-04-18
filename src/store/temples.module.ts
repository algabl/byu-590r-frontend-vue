import { error } from "console"
import templesService from "../services/temples.service"
import { Temple, TempleEvent } from "../types"

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
					console.error("Error deleting temple:", error)
					return Promise.reject(error)
				}
			)
		},
		deleteEvent(
			{ commit },
			{ templeId, eventId }: { templeId: number; eventId: number }
		) {
			return templesService.deleteEvent(eventId).then(
				() => {
					commit("deleteEventSuccess", {
						templeId: templeId,
						eventId: eventId
					})
				},
				(error) => {
					console.error("Error deleting event:", error)
					return Promise.reject(error)
				}
			)
		},
		updateEvent(
			{ commit },
			{
				templeId,
				templeEvent
			}: { templeId: number; templeEvent: TempleEvent }
		) {
			console.log("templeId", templeId)
			console.log("templeEvent", templeEvent)
			return templesService.updateEvent(templeEvent).then(
				(response) => {
					commit("updateEventSuccess", { templeId, event: response })
					return Promise.resolve(response)
				},
				(error) => {
					console.error("Error updating event:", error)
					return Promise.reject(error)
				}
			)
		},
		createEvent(
			{ commit },
			{
				templeId,
				templeEvent
			}: { templeId: number; templeEvent: TempleEvent }
		) {
			console.log("templeId", templeId)
			console.log("event", templeEvent)
			return templesService.createEvent(templeId, templeEvent).then(
				(response) => {
					commit("createEventSuccess", {
						templeId: templeId,
						event: response
					})
					return Promise.resolve(response)
				},
				(error) => {
					console.error("Error creating event:", error)
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
		},
		deleteEventSuccess(
			state: TemplesState,
			{ templeId, eventId }: { templeId: number; eventId: number }
		) {
			const index = state.temples.findIndex((t) => t.id === templeId)
			if (index !== -1) {
				const eventIndex = state.temples[index].temple_events.findIndex(
					(e) => e.id === eventId
				)
				if (eventIndex !== -1) {
					state.temples[index].temple_events.splice(eventIndex, 1)
				}
			}
		},
		updateEventSuccess(
			state: TemplesState,
			{ templeId, event }: { templeId: number; event: TempleEvent }
		) {
			const index = state.temples.findIndex((t) => t.id === templeId)
			if (index !== -1) {
				const eventIndex = state.temples[index].temple_events.findIndex(
					(e) => e.id === event.id
				)
				if (eventIndex !== -1) {
					state.temples[index].temple_events[eventIndex] = event
				}
			}
		},
		createEventSuccess(
			state: TemplesState,
			{ templeId, event }: { templeId: number; event: TempleEvent }
		) {
			console.log("templeId", templeId)
			console.log("event", event)
			const index = state.temples.findIndex((t) => t.id === templeId)
			if (index !== -1) {
				state.temples[index].temple_events.push(event)
			}
		}
	},
	getters: {
		getTemples: (state: TemplesState) => {
			return state.temples
		}
	}
}
