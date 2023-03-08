import { Ajax }  from '../common/ajax.js'

export class Database{
  constructor(){
    this.load()
  }
  get elm_lists(){
    return document.getElementById('databases')
  }

  load(){
    new Ajax({
      url : 'php/main.php',
      method : 'post',
      query : {
        mode : 'get_databases'
      },
      success : this.loaded.bind(this)
    })
  }
  loaded(e){console.log(e)
    if(!e || !e.data){return}
    this.datas = JSON.parse(e.data)
    this.lists()
  }
  lists(){
    for(const data of this.datas){
      this.view(data)
    }
  }
  view(data){
    const li = document.createElement('li')
    li.textContent = data.Database
    this.elm_lists.appendChild(li)
  }

}