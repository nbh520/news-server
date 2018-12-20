'use strict'

import BaseComponent from './BaseComponent'

class AddressComponent extends BaseComponent {
  constructor(){
    super();
    this.TENCENT_KEY = 'YIGBZ-LQZ3X-PON44-ZTPSS-B2ABE-PKBIV';
  }
  //获取定位地址
  async guessPosition(req){
    return new Promise(async (resolve, reject) => {
      let ip
      const defaultIp = '171.43.196.37'
      // if(process.env.NODE_ENV === 'development'){
      //   ip = defaultIp
      // } else {
        try {
          ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
          req.connection.remoteAddress || // 判断 connection 的远程 IP
          req.socket.remoteAddress || // 判断后端的 socket 的 IP
          req.connection.socket.remoteAddress
          const ipArr = ip.split(':')
          ip = ipArr[ipArr.length - 1] || defaultIp
        } catch (err) {
          ip = defaultIp
        // }
      }
      try{
        let result = await super.fetch('https://apis.map.qq.com/ws/location/v1/ip',{
          ip,
          key: this.TENCENT_KEY
        })
        if(result.status === 0){
          const cityInfo = {
            lat: result.result.location.lat,
            lng: result.result.location.lng,
            city: result.result.ad_info.city,
          }
          cityInfo.city = cityInfo.city.replace(/市$/, '');
          resolve(cityInfo)
        }else{
          console.log("定位失败")
          rejects('定位失败')
        }
      }catch(err){
        reject(err)
      }
      return ip
    })
    
    
  }
}
export default AddressComponent