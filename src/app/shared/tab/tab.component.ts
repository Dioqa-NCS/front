import {
  AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core'
import * as _ from 'lodash'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'

export interface Field {
  key: string;
  label: string;
}

interface Item {
  [key: string]: any
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit, AfterViewInit {
  @Output() rowClicked = new EventEmitter<any>()

  @Output() rowsChecked = new EventEmitter<any>()

  @Input() items: (Item | null) [] = []

  @Input() fields: Field[] | null = null

  @Input() clickable = false

  @Input() isPaginate = false

  @Input() pagesSizeOptions: number[] | null = null

  @Input() hasSelect = false

  private _rowsCheck: Item[] = []

  _columns: string[] = []

  _dataSource = new MatTableDataSource<Item | null>([])

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null

  _ = _

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._columns = _.map(this.fields, field => field.key)

    if (this.hasSelect) {
      this._columns.unshift('select')
    }

    if (!this.isPaginate && this.pagesSizeOptions) {
      throw new Error('IsPaginate doit être à true pour utiliser pagesSizeOptions ')
    }
    this._dataSource.data = this.items

    this.route.queryParams.subscribe(() => {
      this._rowsCheck = []
    })
  }

  ngAfterViewInit(): void {
    if (this.isPaginate) {
      this._dataSource.paginator = this.paginator
    }
  }

  set data(items: Item[]) {
    this._dataSource.data = items
  }

  deleteDatas(items: Item[]) {
    this._dataSource.data = _.pullAll(this._dataSource.data, items)
  }

  onClickRow($event: any, item: Item) {
    if ($event.target.type === 'checkbox') {
      return
    }
    this.rowClicked.emit(item)
  }

  onCheckRow(checked: boolean, item: Item) {
    if (!checked) {
      this._rowsCheck.splice(this._rowsCheck.indexOf(item), 1)
      return
    }
    this._rowsCheck.push(item)
    this.rowsChecked.emit(this._rowsCheck)
  }
}
