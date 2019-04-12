import fetch from 'node-fetch'
import Ids from '../models/ids'
import moment from 'moment'

export default class BaseComponent{
  constructor(){
    this.idList = ['admin_id','article_id','comment_id','video_id', 'user_id']
  }
  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON'){
    type = type.toUpperCase()
    resType = resType.toUpperCase()
    if(type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })
      if(dataStr !== ''){
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr
      }
    }
    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if(type === 'POST'){
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    let responseJson
    try{
      const response = await fetch(url, requestConfig)
      if(resType === 'TEXT'){
        responseJson = await response.text()
      }else{
        responseJson = await response.json()
      }
    }catch(err){
      console.log("获取http数据失败" + err)
      throw new Error(err)
    }
    return responseJson
  }

  //获取id列表
  async getId(type){
    if(!this.idList.includes(type)){
      throw new Error('id类型错误');
      return 
    }
    try{
      const idData = await Ids.findOne();
      idData[type]++;
      await idData.save();
      return idData[type]
    }catch(err){
      console.log('获取ID数据失败');
      throw new Error(err)
    }
  }

  //查找某张表里某个键是否有某个值
  async findIsValue(Model, option){
    try{
      const data = await Model.find(option)
      return data.length 
    }catch(err){
      throw Error('查询错误') 
    }
  }

  // 获取？天~现在的新闻条数
  async getDayLength(model, day = 1) {
    let dayArr = []
    let startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let lastData = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    for(let i = 0; i < day; i++){
      startDate = moment().subtract(i, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')
      lastData = moment().subtract(i, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      try {
        await model.find({
          create_time: {
            $gte: startDate,
            $lte: lastData
          }
        }, function (err, docs) {
          dayArr.push(docs.length)
        })
      } catch (err) {
        throw Error(err)
      }
    }
    return dayArr
  }

    //从数组随机选取几个元素
   getRandomArrayElements(arr, count) {
     let shuffled = arr.slice(0),
       i = arr.length,
       min = i - count,
       temp,
       index;
     while (i-- > min) {
       index = Math.floor((i + 1) * Math.random());
       temp = shuffled[index];
       shuffled[index] = shuffled[i];
       shuffled[i] = temp;
     }
     return shuffled.slice(min);
   }

   // 获取token
   getToken() {
     console.log('success')
   }

}