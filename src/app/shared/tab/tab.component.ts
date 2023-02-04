import {
  AfterViewInit,
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core'
import * as _ from 'lodash'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { BehaviorSubject, Observable } from 'rxjs'
import { MatCheckboxChange } from '@angular/material/checkbox'

export interface Field {
  key: string;
  label: string;
}

interface Item {
  [key: string]: any
}

interface CheckoutRow {
  checked: boolean,
  item: Item
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit, AfterViewInit {
  itemsCheck$ = new BehaviorSubject<Item[]>([])

  checkoutRows: CheckoutRow[] = []

  @Input() set itemsCheck(comptesCheck: BehaviorSubject<any[]>) {
    this.itemsCheck$ = comptesCheck
  }

  @Input() set items(items: Observable<Item[]>) {
    items.subscribe(data => {
      this.checkoutRows = data.map(item => ({ item, checked: false }))
      this._dataSource.data = this.checkoutRows
    })
    this.itemsCheck$.next([])
  }

  @Output() rowClicked = new EventEmitter<any>()

  @Input() fields: Field[] | null = null

  @Input() clickable = false

  @Input() isPaginate = false

  @Input() pagesSizeOptions: number[] | null = null

  @Input() hasSelect = false

  _columns: string[] = []

  _dataSource = new MatTableDataSource<Item | null>([])

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null

  _ = _

  ngOnInit() {
    this._columns = _.map(this.fields, field => field.key)

    if (this.hasSelect) {
      this._columns.unshift('select')
    }

    if (!this.isPaginate && this.pagesSizeOptions) {
      throw new Error('IsPaginate doit être à true pour utiliser pagesSizeOptions ')
    }
  }

  ngAfterViewInit() {
    if (this.isPaginate) {
      this._dataSource.paginator = this.paginator
    }
  }

  onClickRow($event: any, checkoutRow: CheckoutRow) {
    if ($event.target.type === 'checkbox') {
      return
    }
    this.rowClicked.emit(checkoutRow.item)
  }

  onCheckRow(event: MatCheckboxChange, checkoutRow: CheckoutRow, index: number) {
    this.checkoutRows[index] = { checked: event.checked, item: checkoutRow.item }

    if (!event.checked) {
      this.checkoutRows[index].checked = event.checked
    }

    const items = this.checkoutRows
      .filter(({ checked }) => checked)
      .map(({ item }) => item)

    this.itemsCheck$.next(items)
  }
}
