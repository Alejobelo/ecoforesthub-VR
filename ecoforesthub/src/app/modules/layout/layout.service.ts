import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Data {
  year1: number;
  year2: number;
  state: string;
  statustree: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {}
  private states = [
    { id: 1, select: false, name: 'Oregon' },
    { id: 2, select: false, name: 'Washington' },
    { id: 3, select: false, name: 'Alaska' },
    { id: 4, select: false, name: 'Colorado' },
    { id: 5, select: false, name: 'Kansas' },
    { id: 6, select: false, name: 'Arkansas' },
    { id: 7, select: false, name: 'Alabama' },
    { id: 8, select: false, name: 'New Hampshire' },
    { id: 9, select: false, name: 'Delaware' },
    { id: 10, select: false, name: 'New Jersey' },
    { id: 11, select: false, name: 'Nebraska' },
    { id: 12, select: false, name: 'Massachusetts' },
    { id: 13, select: false, name: 'South Carolina' },
    { id: 14, select: false, name: 'Texas' },
    { id: 15, select: false, name: 'North Carolina' },
    { id: 16, select: false, name: 'Maine' },
    { id: 17, select: false, name: 'Connecticut' },
    { id: 18, select: false, name: 'Georgia' },
    { id: 19, select: false, name: 'New York' },
    { id: 20, select: false, name: 'Illinois' },
    { id: 21, select: false, name: 'Northern Mariana Islands' },
    { id: 22, select: false, name: 'South Dakota' },
    { id: 23, select: false, name: 'Puerto Rico' },
    { id: 24, select: false, name: 'California' },
    { id: 25, select: false, name: 'Pennsylvania' },
    { id: 26, select: false, name: 'Vermont' },
    { id: 27, select: false, name: 'Hawaii' },
    { id: 28, select: false, name: 'Palau' },
    { id: 29, select: false, name: 'Michigan' },
    { id: 30, select: false, name: 'West Virginia' },
    { id: 31, select: false, name: 'Florida' },
    { id: 32, select: false, name: 'Iowa' },
    { id: 33, select: false, name: 'Wisconsin' },
    { id: 34, select: false, name: 'Oklahoma' },
    { id: 35, select: false, name: 'Guam' },
    { id: 36, select: false, name: 'Virginia' },
    { id: 37, select: false, name: 'Rhode Island' },
    { id: 38, select: false, name: 'Indiana' },
    { id: 39, select: false, name: 'Ohio' },
    { id: 40, select: false, name: 'Maryland' },
    { id: 41, select: false, name: 'Missouri' },
    { id: 42, select: false, name: 'North Dakota' },
    { id: 43, select: false, name: 'Minnesota' },
    { id: 44, select: false, name: 'Tennessee' },
    { id: 45, select: false, name: 'Louisiana' },
    { id: 46, select: false, name: 'Mississippi' },
    { id: 47, select: false, name: 'Kentucky' },
    { id: 48, select: false, name: 'Utah' },
    { id: 49, select: false, name: 'New Mexico' },
    { id: 50, select: false, name: 'Montana' },
  ];

  private filterDataSubject = new BehaviorSubject<any>({});
  filterData$ = this.filterDataSubject.asObservable();

  private statusTree = [
    { statusCode: 1, statusName: 'Live tree' },
    { statusCode: 2, statusName: 'Dead tree' },
    { statusCode: 3, statusName: 'Removed' },
  ];

  data: Data = {
    year1: 0,
    year2: 0,
    state: '',
    statustree: '',
  };

  getStates() {
    return this.states;
  }
  getStatusTree() {
    return this.statusTree;
  }

  updateFilterData(
    year1: number,
    year2: number,
    state: string,
    statustree: string
  ) {
    this.data = {
      year1: year1,
      year2: year2,
      state: state,
      statustree: statustree,
    };
    this.filterDataSubject.next(this.data);
  }
}
