import gql from 'graphql-tag';

export const queryStaffs = gql`
query staffs($req: ReqStaffList!) {
	staffs(req: $req) {
		staffs {
			id
			firstName
			lastName
			profilePicturePath
			passcode
			status
			role
			email
			phoneNumber
			isTipsEligible
			isOvertimeExempt
			wageType
			wageRate
			# assignedTables
			createdAt
		}
	}
}
`