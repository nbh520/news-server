'use strict'
import UserModel from '../../models/user/user'
import ArticleModel from '../../models/article/article'
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

	// 增加新闻的点击量、收藏量
	async dataCount(filed, options) {
		if (!options) return false
		try {
			for (let i of options) {
				let findData = await ArticleModel.find({id: i['id']})
				let count = findData[0][filed] + 1
				let countObj = {}
				countObj[filed] = count
				let res = await ArticleModel.update({id: i['id']}, countObj)
			}
			return true
			
		} catch (err) {
			throw new Error(err)
		}
	}
}

export default new userMethod