// const APP_SERVER_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function getUser() {
	return fetch(`/api/current_user`, {
		method: "GET",
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => {
			console.error(err);
			return err;
		});
}
