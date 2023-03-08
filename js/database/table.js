import { Ajax }       from '../common/ajax.js'
import { SearchList } from './search_list.js'

export class Table{
  constructor(database_name){
    this.database_name = database_name
    this.load()
  }
  get elm_lists(){
    return document.getElementById('tables')
  }

  load(){
    new Ajax({
      url : 'php/main.php',
      method : 'post',
      query : {
        mode : 'get_tables',
        database_name : this.database_name
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
    new SearchList('table')
  }
  clear(){
    this.elm_lists.innerHTML = ''
  }
  lists(){
    for(const data of this.datas){
      this.view(data.name)
    }
  }
  view(name){
    const li = document.createElement('li')
    li.textContent = name
    this.elm_lists.appendChild(li)
  }
  error(msg , e){
    this.clear()
    const li = document.createElement('li')
    li.textContent = e.data
    li.setAttribute('data-error' , 'true')
    this.elm_lists.appendChild(li)
  }

}