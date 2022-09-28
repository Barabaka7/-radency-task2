import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getCategories, Category } from "../../utilities/fetchingData";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const loadCategories = () => {
  return async (dispatch: Dispatch) => {
    const categories = await getCategories();
    dispatch(loadAllCategories(categories));
  };
};

// Interfaces

interface ICategoriesActions {
  LOAD_ALL_CATEGORIES: string;
}

interface ILoadCategories {
  type: ICategoriesActions["LOAD_ALL_CATEGORIES"];
  payload: Category[];
}

const initialState: [] | Category[] = [];

// Slice Object
///////////////////////////////////////

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    loadAllCategories: (state, action: PayloadAction<Category[]>) => {
      return (state = action.payload);
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectAllCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: number) =>
  state.categories.filter((n) => n.id === id)[0];

export const selectCategoryNameById = (state: RootState, cat_id: number) =>
  state.categories.filter((n) => n.id === cat_id)[0].categoryName;

// Exports
///////////////////////////////////////
export const { loadAllCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
