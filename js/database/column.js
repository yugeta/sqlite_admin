import { Ajax }  from '../common/ajax.js'

export class Column{
  constructor(database_name , table_name){
    this.database_name = database_name
    this.table_name    = table_name
    this.load()
  }
  get elm_lists(){
    return document.getElementById('columns')
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

  load(){
    new Ajax({
      url : 'php/main.php',
      method : 'post',
      query : {
        mode          : 'get_columns',
        database_name : this.database_name,
        table_name    : this.table_name,
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
    for(const data of this.datas){
      for(const key in data){
        if(this.headers.indexOf(key) !== -1){continue}
        this.headers.push(key)
      }
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

}