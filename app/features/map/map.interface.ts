

export interface GetResourcesDataProps {
    location: {
        type: string;
        coordinates: number[];
    };
    _id: string;
    name: string;
    type: string;
    availability: string;
    createdBy: string;
    __v: number;
}
export interface GetReportDataProps {
    location: {
        type: string;
        coordinates: number[];
    };
    id: string;
    type: string;
    descsiption: string
    createdBy: string;
    status: "verifed" | "dismissed"
}
export interface GetResourcesReq {
    message: string;
    data: {
        reports: GetReportDataProps[]
        resources: GetResourcesDataProps[];
    };
}