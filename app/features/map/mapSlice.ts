import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetReportDataProps, GetResourcesDataProps, GetResourcesReq } from './map.interface';

interface InitialState {
    resources: GetResourcesDataProps[]
    reports: GetReportDataProps[]
    plannerCoordinates: number[]
}

const initialState: InitialState = {
    resources: [],
    reports: [],
    plannerCoordinates: []
};

export const mapSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMapResources: (state, action: PayloadAction<GetResourcesReq>) => {
            state.reports = action.payload?.data?.reports;
            state.resources = action.payload?.data.resources;
        },
        setPlannerCoordinates: (state, action: PayloadAction<number[]>) => {
            state.plannerCoordinates = action.payload;
        },
    }
});

export const { setMapResources, setPlannerCoordinates } = mapSlice.actions;
export default mapSlice.reducer;
