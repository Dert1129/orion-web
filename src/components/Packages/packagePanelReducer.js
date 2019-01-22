import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';

export const packages = (state = {}, action) => {
	let newState = {}; 
	let filteredPackageList = state.unfiltered;
	let filters = state.filters;
	switch(action.type) {
		case actionNames.SET_PACKAGES:
			newState.filtered = action.payload;
			newState.unfiltered = action.payload;
			newState.filters = [];
			return newState;
		case actionNames.REMOVE_FILTER:
			if (filters.length > 0) {
				filters.map((filter, index) => {
					if (filter.filterType === action.payload.filterType) {
						filters.splice(index, 1);
					}
					return filters;
				});
			}
			filteredPackageList = applyFilters(filters, filteredPackageList);
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			return newState;
		case actionNames.ADD_FILTER:

			if (filters.length > 0) {
				filters.map((filter, index) => {
					if (filter.filterType === action.payload.filterType) {
						filters.splice(index, 1, action.payload);
					} else {
						filters.push(action.payload)
					}
					return filters;
				})
				
			} else {
				filters.push(action.payload);
			}
			
			filteredPackageList = applyFilters(filters, filteredPackageList);
			
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			return newState;
		default:
			return state;
	}
}

const applyFilters = (filters, filteredPackageList) => {
	filters.map((filter, index) => {
		if (filter.filterType === filterActions.filterTypes.INSTITUTION) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.institution === filter.value) {
					return packageItem;
				}
				return null;
			});
		} 
		else if (filter.filterType === filterActions.filterTypes.PACKAGE_TYPE) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.packageType === filter.value) {
					return packageItem;
				}
				return null;
			});
		}
		else if (filter.filterType === filterActions.filterTypes.SUBMITTER) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.submitter.id === filter.value) {
					return packageItem;
				}
				return null;
			});
		}
		return filteredPackageList;
	});
	return filteredPackageList;
}