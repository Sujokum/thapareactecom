import {createContext, useContext , useEffect , useReducer} from 'react';
import {useProductContext} from './productContext'
import reducer from '../reducer/filterReducer'

const FilterContext = createContext();

const initialState = {
     filter_products : [],
     all_products : [],
     grid_view : true,
     sorting_value : 'lowest'
}

export const FilterContextProvider = ({children})=>{

    const {products} = useProductContext();

    const [state , dispatch] = useReducer(reducer , initialState)


    // to set the grid view

    const setGridView = ()=>{
        return dispatch({type : 'SET_GRID_VIEW'})
    }
    const setListView = ()=>{
        return dispatch({type : 'SET_LIST_VIEW'})
    }
    
    const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

    useEffect(()=>{
        dispatch({type : "LOAD_FILTER" , payload : products})
    },[products])

    return(
        <FilterContext.Provider value = {{...state , setGridView ,setListView , sorting }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}