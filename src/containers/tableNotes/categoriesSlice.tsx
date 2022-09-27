import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getCategories, Category } from "../../utilities/fetchingData";

const loadCategories = () => {
  return async (dispatch: Dispatch) => {
    const categories = await getCategories();
    dispatch({ type: "categories/loadAllCategories", payload: categories });
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

// Slice Object
///////////////////////////////////////

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    loadAllCategories: (state: Category[], action: ILoadCategories) => {
      state = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectAllCategories = (state: Category[]) => state;

export const selectCategoryById = (state: Category[], id: number) =>
  state.filter((n) => n.id === id)[0];

export const selectCategoryNameById = (state: Category[], cat_id: number) =>
  state.filter((n) => n.id === cat_id)[0].categoryName;

// Exports
///////////////////////////////////////
export const { loadAllCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
