function characterCount(count: number, value: string) {
	return (
		value.length >= count ||
		`Password must be at least ${count} characters.`
	)
}

function stringsDoNotMatch(value: string, compareTo: string, message: string) {
	return value !== compareTo || message
}

function stringsMatch(value: string, compareTo: string, message: string) {
	return value === compareTo || message
}

function isEmail(value: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(value) || "Email must be valid."
}

function required(value: string) {
	return !!value || "This field is required."
}

function isType(value: any, type: string) {
	try {
		if (type === "number") {
			return (
				!isNaN(parseFloat(value)) ||
				`Value must be castable to type ${type}.`
			)
		} else if (type === "boolean") {
			return (
				value === "true" ||
				value === "false" ||
				`Value must be castable to type ${type}.`
			)
		} else if (type === "string") {
			return (
				typeof value.toString() === "string" ||
				`Value must be castable to type ${type}.`
			)
		}
		return `Unsupported type: ${type}.`
	} catch {
		return `Value must be castable to type ${type}.`
	}
}

export {
	characterCount,
	stringsDoNotMatch,
	stringsMatch,
	isEmail,
	required,
	isType
}
