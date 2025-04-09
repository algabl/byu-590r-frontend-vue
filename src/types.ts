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
	temple_events: [
		{
			id: number
			name: string
			date: string
			description: string | undefined
		}
	]
}
