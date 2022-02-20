export async function get() {
	const items = [0, 1, 2];

	return {
		body: { items }
	};
}
