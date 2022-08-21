import { $ } from './utils/dom'
import { todoTemplate, doingTemplate, doneTemplate } from './template'
import Store from './store'
import { TypeIds, Types } from './types'

export default class App {
  private store: Store

  constructor(store) {
    this.store = store
  }

  private initEventListener(): void {
    $('#to-do-form').addEventListener('submit', (e) => e.preventDefault())

    $('#to-do-form-btn-add').addEventListener('click', this.addList.bind(this))

    $('#to-do-list').addEventListener('click', this.listBtnsEventHandler.bind(this))
  }

  private listBtnsEventHandler(e: Event): void {
    const $element = e.target as HTMLElement
    const $li = $element.closest('li') as HTMLElement
    if ($element.classList.contains('btn-edit')) this.editList($li)
    if ($element.classList.contains('btn-next')) this.moveList($li)
    if ($element.classList.contains('btn-remove')) this.removeList($li)
  }

  private makeHtml(template: (string, number) => string, data: string[]): string {
    const html: string[] = data.map(template)
    return html.join('')
  }

  private getHTMLElementData($li: HTMLElement): { type: Types; id: number } {
    const parseType = (dataset: TypeIds): Types => {
      const types = {
        ['todoId']: 'todos',
        ['doingId']: 'doings',
        ['doneId']: 'dones',
      }
      return types[dataset] as Types
    }
    const dataSet: TypeIds = Object.keys($li.dataset)[0] as TypeIds
    const type: Types = parseType(dataSet)
    const id: number = Number($li.dataset[`${dataSet}`])
    return { type, id }
  }

  private addList(): void {
    const $input = $('#to-do-form-input') as HTMLInputElement
    const newTodo: string = $input.value
    // 사용자 행동 예외처리
    if (!newTodo) {
      return alert('할 일을 입력해 주세요.')
    }

    $input.value = ''
    this.store.addItem(newTodo)
    return this.render()
  }

  private removeList($li: HTMLElement): void {
    if (confirm('삭제할까요?')) {
      const { type, id } = this.getHTMLElementData($li)
      this.store.removeItem(type, id)
      return this.render()
    }
    return
  }

  private moveList($li: HTMLElement): void {
    if (confirm('완료했나요?')) {
      const $span = $li.querySelector('span') as HTMLElement
      const text: string = $span.textContent || ''
      const { type, id } = this.getHTMLElementData($li)
      this.store.moveItem(type, id, text)
      return this.render()
    }
    return
  }

  private editList($li: HTMLElement): void {
    const $span: HTMLElement = $li.querySelector('span') as HTMLElement
    const prevText: string = $span.textContent || ''
    const updatedText: string = prompt('할 일을 수정할까요?', prevText) || prevText
    const { type, id } = this.getHTMLElementData($li)
    this.store.editItem(type, id, updatedText)
    return this.render()
  }

  private renderCount(): void {
    $('#todo-count').innerHTML = `${this.store.todosLength} 개`
    $('#doing-count').innerHTML = `${this.store.doingsLength} 개`
    $('#done-count').innerHTML = `${this.store.donesLength} 개`
  }

  private render(): void {
    this.store.setLocalStorage()
    this.renderCount()
    $('#list-todos').innerHTML = this.makeHtml(todoTemplate, this.store.todos)
    $('#list-doings').innerHTML = this.makeHtml(doingTemplate, this.store.doings)
    $('#list-dones').innerHTML = this.makeHtml(doneTemplate, this.store.dones)
  }

  run(): void {
    this.initEventListener()
    this.render()
  }
}
