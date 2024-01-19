import gql from 'graphql-tag';

export const mutationStaffCreate = gql`
mutation staffCreate($req: ReqStaffCreate!) {
	staffCreate(req: $req) {
		staff {
			id
		}
	}
}
`

export const mutationStaffUpdate = gql`
mutation staffUpdate($req: ReqStaffUpdate!) {
	staffUpdate(req: $req) {
		staff {
			id
		}
	}
}
`

export const mutationStaffDelete = gql`
mutation staffDelete($req: ReqStaffDelete!) {
	staffDelete(req: $req) {
		isSuccess
	}
}
`