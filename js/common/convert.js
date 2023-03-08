export class Convert{
  constructor(data){
    this.data = data
  }

  // 任意文字列の中から、{{key}}という文字列を、{key:val}で置換する処理
  double_blancket = function(data){
    if(!this.data || typeof this.data !== 'string'){return null}
    let str = this.data
    if(data){
      const reg = new RegExp('{{(.*?)}}','g')
      const arr = []
      let res = []
      while ((res = reg.exec(str)) !== null) {
        arr.push(res[1])
      }
      for(let key of arr){
        const val = typeof data[key] !== 'undefined' ? data[key] : ''
        str = str.split('{{'+String(key)+'}}').join(val)
      }
    }
    return str
  }

  get jwt_decode(){
    const base64Url = this.data.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const str1 = atob(base64)
    const str2 = escape(str1)
    const str3 = decodeURIComponent(str2)
    return JSON.parse(str3)
  }
}