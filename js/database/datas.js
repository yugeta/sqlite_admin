import { Ajax }  from '../common/ajax.js'

export class Datas{
  constructor(database_name , table_name , sql_text){
    this.database_name = database_name
    this.table_name    = table_name
    this.sql_text      = sql_text
    this.start_time = (new Date())
    this.set_first_sql_text()
    this.count_load()
    this.load()
  }
  get elm_lists(){
    return document.getElementById('datas')
  }
  get t_head(){
    const thead = this.elm_lists.querySelector('thead')
    if(thead){
      return thead
    }
    else{
      const new_thead = document.createElement('thead')
      this.elm_lists.appendChild(new_thead)
      return new_thead
    }
  }
  get t_body(){
    const tbody = this.elm_lists.querySelector('tbody.columns')
    if(tbody){
      return tbody
    }
    else{
      const new_tbody = document.createElement('tbody')
      new_tbody.className = 'new_tbody'
      this.elm_lists.appendChild(new_tbody)
      return new_tbody
    }
  }
  get sql_text_elm(){
    return document.querySelector(`.datas-area [name='sql_text']`)
  }
  get elm_time(){
    return document.querySelector(`.various-property .time`)
  }

  get sql_text_value(){
    if(this.sql_text){
      return this.sql_text
    }
    else{
      return this.sql_text_elm.value
    }
  }

  set_first_sql_text(){
    const sql = this.sql_text || `SELECT * FROM ${this.table_name} LIMIT 10`
    this.sql_text_elm.value = sql
  }

  get get_sql_count(){
    const sql_text = this.sql_text_value
    if(sql_text){
      const match = sql_text.match(/SELECT (.+?) FROM (.+?)( LIMIT .+?)$/i)
      if(match && match[1].indexOf('count(') === -1){
        return `SELECT count(*) FROM ${match[2]}`
      }
    }
    return `SELECT count(*) FROM ${this.table_name}`
  }
  get elm_datas_count(){
    return document.querySelector('.datas-area .count')
  }

  load(){
    const sql_text = this.sql_text_value
    if(!sql_text){return}
    new Ajax({
      url : 'php/main.php',
      method : 'post',
      query : {
        mode : 'get_datas',
        sql_text : sql_text,
        database_name : this.database_name,
        table_name : this.table_name,
      },
      success : this.loaded.bind(this)
    })
  }
  loaded(e){
    if(!e || !e.data){return}
    try{
      this.datas = JSON.parse(e.data)
    }
    catch(err){
      this.error(err , e)
    }
    if(!this.datas){return}
    this.clear()
    this.lists()
    this.view_time()
  }
  clear(){
    this.elm_lists.innerHTML = ''
  }
  lists(){
    this.view_header()
    for(const data of this.datas){
      this.view_row(data)
    }
  }

  count_load(){
    if(!this.get_sql_count){return}
    const sql_text = this.sql_text_value
    new Ajax({
      url : 'php/main.php',
      method : 'post',
      query : {
        mode : 'get_datas',
        sql_text : this.get_sql_count,
        database_name : this.database_name,
        table_name : this.table_name,
      },
      success : this.count_loaded.bind(this)
    })
  }
  count_loaded(e){
    const datas = JSON.parse(e.data)
    for(const key in datas[0]){
      this.elm_datas_count.textContent = datas[0][key] + ' (sql : '+ this.get_sql_count +')'
    }
  }
  view_header(){
    this.get_header()
    if(!this.headers || !this.headers.length){return}
    const tr = document.createElement('tr')
    const num = document.createElement('th')
    num.className= 'num'
    num.textContent = '#'
    tr.appendChild(num)
    for(const key of this.headers){
      const th = document.createElement('th')
      th.textContent = key
      tr.appendChild(th)
    }
    this.t_head.appendChild(tr)
  }
  get_header(){
    this.headers = []
    for(const key in this.datas[0]){
      if(this.headers.indexOf(key) !== -1){continue}
      this.headers.push(key)
    }
  }
  view_row(data){
    const tr = this.set_matrix(data)
    this.t_body.appendChild(tr)
  }
  set_matrix(data){
    const tr = document.createElement('tr')
    const num = document.createElement('th')
    num.className = 'num'
    tr.appendChild(num)
    for(const key of this.headers){
      const td = document.createElement('td')
      td.textContent = data[key] ?? ''
      tr.appendChild(td)
    }
    return tr
  }
  error(msg , e){
    this.clear()
    const li = document.createElement('li')
    li.textContent = e.data
    li.setAttribute('data-error' , 'true')
    this.elm_lists.appendChild(li)
  }

  view_time(){
    const time_taked = ((+new Date()) - this.start_time) / 1000
    this.elm_time.textContent = time_taked
  }

}