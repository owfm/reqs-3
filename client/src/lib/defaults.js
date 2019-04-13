export const defaultReq = {
	title: "",
	equipment: "",
	notes: ""
};

export const defaultPostParams = {
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, cors, *same-origin
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	headers: {
		"Content-Type": "application/json"
	},
	redirect: "follow", // manual, *follow, error
	referrer: "no-referrer" // no-referrer, *client
};
