import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Point tipini tanımlayın
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  color: string;
  popularity: number;
}

interface ListState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ListState = {
  items: [],
  status: "idle",
  error: null,
};

interface QueryParams {
  ProductType?: string;
  ProductBrand?: string;
  Color?: string;
  SortBy?:string;
  Name?:string;
}

export const getList = createAsyncThunk<Product[], QueryParams>(
  "list/getList",
  async (params) => {
    const { ProductType, ProductBrand, Color, SortBy, Name } = params;
    
    const queryParams = new URLSearchParams();
    if (ProductType) queryParams.append("ProductType", ProductType);
    if (ProductBrand) queryParams.append("ProductBrand", ProductBrand);
    if (Color) queryParams.append("Color", Color);
    if (SortBy) queryParams.append("SortBy", SortBy || ''); // ensure SortBy is appended if provided
    if (Name) queryParams.append("Name", Name);
    const queryString = queryParams.toString();

    try {
      const { data } = await axios.get(
        `https://localhost:50000/vk/api/v1/Products/GetProductsByParameter${queryString ? `?${queryString}` : ''}`
      );
      return data.response;
    } catch (error:any) {
      throw Error(`Error fetching data: ${error.message}`);
    }
  }
);

export const deleteItem = createAsyncThunk<number, number>(
  "list/deleteItem",
  async (itemId) => {
    await axios.delete(`https://localhost:50000/vk/api/v1/Products/${itemId}`, {
      headers: {
        accept: "*/*",
      },
    });
    return itemId; // Sadece silinen öğenin ID'sini döndür
  }
);

export const addItem = createAsyncThunk<Product, Product>(
  "list/addItem",
  async (requestData) => {
    const { data } = await axios.post(
      "https://localhost:50000/vk/api/v1/Products",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    return data;
  }
);
// PUT isteği için bir thunk oluşturun
export const updateItem = createAsyncThunk<Product, Product>(
  'list/updateItem',
  async (updatedProduct) => {
    const { data } = await axios.put(
      `https://localhost:50000/vk/api/v1/Products/${updatedProduct.id}`,
      updatedProduct,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
        },
      }
    );
    return data;
  }
);

export const getProducts = createAsyncThunk<Product[]>(
  "list/getProducts",
  async () => {
    const { data } = await axios.get(
      `https://localhost:50000/vk/api/v1/Products`,
      {
        headers: {
          accept: "text/plain",
        },
      }
    );
    return data.response;
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateItem.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "succeeded";
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
      
  },
});

export default listSlice.reducer;
