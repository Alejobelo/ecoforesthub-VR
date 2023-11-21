import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { HttpStatusCode } from '@angular/common/http';

interface SelectedList {
  selecAll: boolean;
  selectList: any[];
}
interface State {
  id: number;
  select: boolean;
  name: string;
}
interface StatusTree {
  statusCode: number;
  statusName: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
    `
      .scrollable-form {
        max-height: 200px;
        overflow-y: auto;
      }
    `,
  ],
})
export class FilterComponent {
  states: State[] = [];
  statusTree: StatusTree[] = [];
  statusTreeSelected: string = '';
  years: number[] = [];
  years2: number[] = [];
  yearValue1: number = 2000;
  yearValue2: number = 2020;
  stateSelect: string = '';

  constructor(private layoutService: LayoutService) {
    const startYear = 1968;
    const endYear = 2020;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.states = this.layoutService.getStates();
    this.statusTree = this.layoutService.getStatusTree();
  }

  selectedStates: SelectedList = {
    selecAll: false,
    selectList: [],
  };

  filterList: string[] = [];
  query: string =
    'SELECT tree.tree_inventory_year, tree.tree_status_code, plot_tree.plot_state_code_name FROM bigquery-public-data.usfs_fia.tree AS tree JOIN bigquery-public-data.usfs_fia.plot_tree AS plot_tree ON tree.tree_state_code = plot_tree.plot_state_code';

  //   SELECT plot_state_code_name AS estado, COUNT(*) as cantidad_arboles_vivos
  // FROM `bigquery-public-data.usfs_fia.tree` AS arboles
  // JOIN `bigquery-public-data.usfs_fia.plot` AS tramas
  // ON arboles.plot_sequence_number = tramas.plot_sequence_number
  // WHERE arboles.tree_inventory_year = 2018
  // GROUP BY estado
  // ORDER BY cantidad_arboles_vivos DESC;
  applyFilter() {
    // ... lógica para construir la consulta y obtener yearValue1, yearValue2, estado, etc.

    this.layoutService.updateFilterData(
      this.yearValue1,
      this.yearValue2,
      this.stateSelect,
      this.statusTreeSelected
    );
  }
  onSubmit() {
    this.filterList = this.selectedStates.selectList.map((filter) => {
      this.filterList.push(filter.name);
      return filter.name;
    });
    this.filterList.push(this.yearValue1.toString());
    this.filterList.push(this.yearValue2.toString());
    if (this.yearValue1 > 0 && this.yearValue2 > 0) {
      this.query =
        this.query +
        ` WHERE tree.tree_inventory_year >= ${this.yearValue1} AND tree.tree_inventory_year <= ${this.yearValue2}`;
    }
    this.applyFilter();
  }
}
