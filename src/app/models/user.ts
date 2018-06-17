export class User
{
	constructor(
			public id: number,
			public role: string,
			public name: string,
			public image: string,
			public email: string,
			public password: string
		)
	{}
}