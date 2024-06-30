import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetReportDataProps, GetResourcesDataProps, GetResourcesReq } from './map.interface';

interface InitialState {
    resources: GetResourcesDataProps[]
    reports: GetReportDataProps[]
}

const initialState: InitialState = {
    resources: [],
    reports: []
};

export const mapSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMapResources: (state, action: PayloadAction<GetResourcesReq>) => {
            state.reports = action.payload?.data?.reports;
            state.resources = action.payload?.data.resources;
        },
    }
});

export const { setMapResources } = mapSlice.actions;
export default mapSlice.reducer;
