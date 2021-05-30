import { useContext, createContext } from "react";

export class SearchStore {
	request: string;	

	constructor() {
		this.request = '';
	}
}

export const searchContext = createContext(new SearchStore());
export const userSearchStore = () => useContext(searchContext);