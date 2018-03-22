export default function adminAccount(state={loading: false}, action) {
	switch (action.type) {
		case "BIGUSERS":
			return {
				...state,
				bigUsers: action.bigUsers,
				loading: true,
			};
		default:
			return state;

	}
}
