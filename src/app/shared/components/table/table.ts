import {Component, input} from '@angular/core';
import {TableColumn} from '../../models/table-column';
import {TableButton} from '../../models/table-button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTooltip,MatIcon,NgClass],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input<any>([]);

  columns = input<TableColumn[]>();
  buttons = input<TableButton[]>([]);

  constructor() {}


  transFormData(data: any, column: TableColumn): any {
    if (column.isShowAll || (data?.includes && data.includes('<span'))) {
      return data;
    }

    const maxLength = this.columns.length > 5 ? 30 : 200;
    return data?.length > maxLength ? data.substring(0, maxLength) + '...' : data;
  }

}

