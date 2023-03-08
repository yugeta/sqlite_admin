

export class SearchList{
  constructor(type){
    switch(type){
      case 'database':
        this.narrow_lists(this.lists_database , this.value_database)
        break
      case 'table':
        this.narrow_lists(this.lists_table , this.value_table)
        break
    }
  }

  get input_database(){
    return document.querySelector(`body .label input[name='search_database']`)
  }
  get value_database(){
    if(!this.input_database){return}
    return this.input_database.value
  }
  get list_root_database(){
    return document.getElementById('databases')
  }
  get lists_database(){
    if(!this.list_root_database){return}
    return this.list_root_database.children
  }

  get input_table(){
    return document.querySelector(`body .label input[name='search_table']`)
  }
  get value_table(){
    if(!this.input_table){return}
    return this.input_table.value
  }
  get list_root_table(){
    return document.getElementById('tables')
  }
  get lists_table(){
    if(!this.list_root_table){return}
    return this.list_root_table.children
  }

  narrow_lists(lists , value){
    if(!lists || !lists.length){return}
    const reg = new RegExp(value)
    let color = null
    for(const list of lists){
      const value = list.textContent
      const res = value.match(reg)
      if(!value){
        if(list.hasAttribute('data-color')){
          list.removeAttribute('data-color')
        }
      }
      else if(res){
        color = color !== 1 ? 1 : 2
        list.setAttribute('data-color' , color)
      }
      else{
        list.setAttribute('data-color' , 0)
      }
    }
  }
}
