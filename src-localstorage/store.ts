import { Items, ItemStore, NextTypes, PrevTypes } from './types'

export default class Store implements ItemStore {
  private _items: Items

  constructor() {
    this._items = {
      todos: [],
      doings: [],
      dones: [],
    }
    const prevData = this.getLocalStorage()
    if (prevData) {
      for (const key in prevData) {
        prevData[key].forEach((v) => this._items[key].push(v))
      }
    }
  }

  private getNextType(currentType: PrevTypes): NextTypes {
    const types = {
      ['todos']: 'doings',
      ['doings']: 'dones',
    }
    return types[currentType] as NextTypes
  }

  get items() {
    return this._items
  }

  get todos() {
    return this._items.todos
  }

  get doings() {
    return this._items.doings
  }

  get dones() {
    return this._items.dones
  }

  get todosLength() {
    return this._items.todos.length
  }

  get doingsLength() {
    return this._items.doings.length
  }

  get donesLength() {
    return this._items.dones.length
  }

  addItem(newItem) {
    this._items.todos.push(newItem)
  }

  removeItem(type, targetId) {
    this._items[`${type}`].splice(targetId, 1)
  }

  moveItem(type, targetId, text) {
    this._items[`${type}`].splice(targetId, 1)
    this._items[`${this.getNextType(type)}`].push(text)
  }

  editItem(type, targetId, updatedText) {
    this._items[`${type}`][targetId] = updatedText
  }

  setLocalStorage() {
    localStorage.setItem('data', JSON.stringify(this._items))
  }

  getLocalStorage() {
    const items = localStorage.getItem('data')
    return items ? JSON.parse(items) : {}
  }
}
