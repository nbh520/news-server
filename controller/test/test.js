/** 测试 */
import BaseComponent from '../../prototype/BaseComponent'
import Comment from '../../models/comment/comment'

class Test extends BaseComponent {
  constructor(){
    super()
    this.insert = this.insert.bind(this)
  }
  async insert(){
    const id = await this.getId('comment_id')
    var data = new Comment({
      id,
      article_id: 0, //评论文章id
      to_uid: 0,    //评论目标人的id，如果没有目标人，则该字段为空
      user_id: 0,   //评论人id
      content: 'String',  //评论内容
      create_time: 'String', //创建时间
      update_time: 'String', //修改时间
    })
    data.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }

    });
  }
  test(req, res, next){
    req.session.sessionTest = 'xxx'
    res.send({
      status: 1,
      data: req.session
    })
  }
}
export default new Test()
  