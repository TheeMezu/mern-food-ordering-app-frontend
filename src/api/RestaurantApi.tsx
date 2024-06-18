// import { Restaurant } from "@/types";
import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// we did it optional as in the first time loading city would be undefined
// and we need to cater for that
export const useSearchRestaurants = (searchState: SearchState, city?: string) => {

    const createSearchRequest = async ():Promise<RestaurantSearchResponse> => {

        const params = new URLSearchParams()
        // ("parameter name", its value)
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        );

        if (!response.ok) {
        throw new Error("Failed to get restaurant");
        }

        return response.json();
    };

    const { data: results, isLoading } = useQuery(
        // here it tells the query to run whenever a new searchState occurs 
        // searchState is the search that the user types in
        ["searchRestaurants", searchState], 
        createSearchRequest,
        { enabled: !!city } 
        // we add this to make sure that the city is there for the query to run
    );

    return {
        results,
        isLoading,
    };
};

