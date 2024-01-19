import gql from 'graphql-tag';

export const queryUserMe = gql`
query userMe {
	userMe {
		user {
			firstName
			lastName
			phoneNumber
			identificationNumber
			address {
				id
				addressLine1
				addressLine2
				city
				country
				postcode
			}
		}
	}
}
`

export const queryEstablishmentTypeList = gql`
query establishmentTypeList {
	establishmentTypeList {
		types {
			id
			name
		}
	}
}
`

export const queryPlaceList = gql`
query placeList($req: ReqPlaceList!) {
	placeList(req: $req) {
		places {
			id
			logoUrl
			name
			description
			establishmentType {
				id
				name
			}
			address {
				id
				addressLine1
				addressLine2
				city
				postcode
				country
			}
		}
	}
}
`