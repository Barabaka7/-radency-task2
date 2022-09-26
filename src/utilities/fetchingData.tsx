import axios from "axios";
export const BASE_URL = "http://localhost:3001";

export const getNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/NOTES`);
    const NOTES = response.data;
    return NOTES;
  } catch (errors) {
    console.error(errors);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/CATEGORY`);
    const CATEGORIES = response.data;
    return CATEGORIES;
  } catch (errors) {
    console.error(errors);
  }
};

export interface Category {
  id: number;
  categoryName: string;
  categoryIcon: string;
}

export interface Note {
  id: number;
  noteName: string;
  creationDate: string;
  category: number;
  noteContent: string;
  isArchived: boolean;
}

export enum TableType {
  Active,
  Archive,
  Summary,
}

export interface FormState {
  createMode: boolean;
  noteId?: number;
}
