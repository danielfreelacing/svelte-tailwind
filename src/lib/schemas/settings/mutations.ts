import gql from 'graphql-tag';

export const mutationUploadContent = gql`
mutation contentUpload($req: ReqUploadContent!) {
	contentUpload(content: $req) {
		url
	}
}
`

export const mutationUserUpdate = gql`
mutation userUpdate($req: ReqUserUpdate!) {
	userUpdate(req: $req) {
		user {
			id
		}
	}
}
`

export const mutationAddressCreate = gql`
mutation addressCreate($req: ReqAddressCreate!) {
	addressCreate(req: $req) {
		address {
			id
		}
	}
}
`

export const mutationAddressUpdate = gql`
mutation addressUpdate($req: ReqAddressUpdate!) {
	addressUpdate(req: $req) {
		address {
			id
		}
	}
}
`

export const mutationPlaceCreate = gql`
mutation placeCreate($req: ReqPlaceCreate!) {
	placeCreate(req: $req) {
		place {
			id
		}
	}
}
`

export const mutationPlaceUpdate = gql`
mutation placeUpdate($req: ReqPlaceUpdate!) {
	placeUpdate(req: $req) {
		place {
			id
		}
	}
}
`

export const mutationPlaceDelete = gql`
mutation placeDelete($req: ReqPlaceDelete!) {
	placeDelete(req: $req)
}
`

export const mutationUserChangePassword = gql`
mutation userChangePassword($req: ReqUserChangePassword!) {
	userChangePassword(req: $req) {
		isSuccess
	}
}
`