'use strict'
import UserModel from '../../models/user/user'
import BaseComponent from '../../prototype/BaseComponent'
class userMethod extends BaseComponent {
	constructor() {
		super();
	}
	// 根据用户id 查询出想要字段的结果 
	async queryById(id, filed) {
		try {
			let res = await UserModel.find({id})
			return res[0][filed]
		} catch (err) {
			throw new Error
		}
		
	}
}

export default new userMethod