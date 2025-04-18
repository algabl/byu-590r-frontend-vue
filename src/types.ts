export interface TempleEvent {
	id: number
	name: string
	date: string
	description: string | undefined
}

export interface Temple {
	id: number
	name: string
	latitude: number
	longitude: number
	status: string
	walk_score: number
	bike_score: number
	transit_score: number
	temple_image: string | File
	created_at: string
	updated_at: string
	deleted_at: string
	temple_events: TempleEvent[]
	temple_details?: {
		id: number
		temple_id: number
		architect: string
		square_footage: number
		number_ordinance_rooms: number
		number_sealing_rooms: number
		number_surface_parking_spots: number
		additional_notes: string
	}
}
