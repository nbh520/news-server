'use strict'

class AddressComponent{
  constructor(){}
  async guessPosition(req){
    let ip
    const defaultIp = '180.158.102.141'
    console.log(req.socket.remoteAddress)

    try{
      ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
      const ipArr = ip.split(':')
      ip = ipArr[ipArr.length - 1] || defaultIp
    }catch(err){
      ip = defaultIp
    }
    return ip
  }
}
export default AddressComponent