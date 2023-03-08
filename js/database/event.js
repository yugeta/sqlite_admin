import { Table }  from './table.js'
import { Column } from './column.js'
import { Datas }  from './datas.js'
import { SearchList } from './search_list.js'

export class Event{
  constructor(){
    window.addEventListener('click' , this.click.bind(this))
    document.querySelector(`body .label input[name='search_database']`).addEventListener('input' , this.change_search_database.bind(this,'database'))
    document.querySelector(`body .label input[name='search_table']`).addEventListener('input' , this.change_search_database.bind(this,'table'))
  }

  get database_name(){
    const elm = document.querySelector(`#databases li[data-active='true']`)
    if(elm){
      return elm.textContent
    }
  }

  get table_name(){
    const elm = document.querySelector(`#tables li[data-active='true']`)
    if(elm){
      return elm.textContent
    }
  }

  get elm_tables(){
    return document.getElementById('tables')
  }

  get elm_columns(){
    return document.getElementById('columns')
  }

  get elm_datas(){
    return document.getElementById('datas')
  }
  
  get sql_text_elm(){
    return document.querySelector(`.datas-area [name='sql_text']`)
  }

  click(e){
    if(e.target.closest('#databases')){
      this.click_database(e)
    }
    else if(e.target.closest('#tables')){
      this.click_table(e)
    }
    else if(e.target.closest(`button.run`)){
      new Datas(this.database_name , this.table_name , this.sql_text_elm.value)
    }
  }
  click_database(e){
    const li = e.target.closest('li')
    this.clear_active(li)
    this.clear_tables()
    this.clear_columns()
    this.clear_datas()
    li.setAttribute('data-active','true')
    new Table(this.database_name)
  }
  click_table(e){
    const li = e.target.closest('li')
    this.clear_active(li)
    this.clear_columns()
    this.clear_datas()
    li.setAttribute('data-active','true')
    new Column(this.database_name , this.table_name)
    new Datas(this.database_name , this.table_name)
  }

  clear_active(target){
    const elms = target.parentNode.childNodes
    for(const elm of elms){
      if(!elm.hasAttribute('data-active')){continue}
      elm.removeAttribute('data-active')
    }
  }

  clear_tables(){
    this.elm_tables.innerHTML = ''
  }
  clear_columns(){
    this.elm_columns.innerHTML = ''
  }
  clear_datas(){
    this.sql_text_elm.value = ''
    this.elm_datas.innerHTML = ''
  }

  change_search_database(type){
    new SearchList(type)
  }
}