import { Component } from '@angular/core';

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrl: './store-locator.component.css',
})
export class StoreLocatorComponent {
  // Dropdown options
  states: string[] = ['State 1', 'State 2', 'State 3']; // Replace with actual states
  cities: string[] = []; // Cities will be dynamically populated based on the selected state

  // Selected values
  selectedState: string = '';
  selectedCity: string = '';

  // Store data
  stores: { name: string; address: string; city: string; state: string }[] = [
    {
      name: 'Store 1',
      address: '123 Main St',
      city: 'City 1',
      state: 'State 1',
    },
    {
      name: 'Store 2',
      address: '456 Oak St',
      city: 'City 2',
      state: 'State 1',
    },
    {
      name: 'Store 3',
      address: '789 Pine St',
      city: 'City 1',
      state: 'State 2',
    },
    // Add more stores
  ];
  displayedStores: {
    name: string;
    address: string;
    city: string;
    state: string;
  }[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of cards per page
  totalPages: number = 1;

  constructor() {
    this.updateDisplayedStores();
  }

  // Update cities when a state is selected
  onStateChange(): void {
    this.cities = this.getCitiesForState(this.selectedState);
    this.selectedCity = ''; // Reset city when state changes
    this.filterStores();
  }

  // Filter stores when a city is selected
  onCityChange(): void {
    this.filterStores();
  }

  // Filter stores based on selected state and city
  filterStores(): void {
    let filteredStores = this.stores;

    if (this.selectedState) {
      filteredStores = filteredStores.filter(
        (store) => store.state === this.selectedState
      );
    }
    if (this.selectedCity) {
      filteredStores = filteredStores.filter(
        (store) => store.city === this.selectedCity
      );
    }

    this.currentPage = 1; // Reset to first page after filtering
    this.updateDisplayedStores(filteredStores);
  }

  // Update the displayed stores based on the current page
  updateDisplayedStores(filteredStores = this.stores): void {
    this.totalPages = Math.ceil(filteredStores.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedStores = filteredStores.slice(startIndex, endIndex);
  }

  // Pagination controls
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedStores();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedStores();
    }
  }

  // Helper: Get cities for a selected state (mock data for now)
  getCitiesForState(state: string): string[] {
    const cityMap: { [key: string]: string[] } = {
      'State 1': ['City 1', 'City 2'],
      'State 2': ['City 1', 'City 3'],
      'State 3': ['City 4', 'City 5'],
    };
    return cityMap[state] || [];
  }
}
