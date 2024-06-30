import requestNew from "@/app/utils/requestNew";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetResourcesReq } from "./map.interface";
import { useAppDispatch } from "@/app/redux/store";
import { setMapResources, setPlannerCoordinates } from "./mapSlice";

export const useGetResource = () => {
    const dispatch = useAppDispatch();
    return useQuery<GetResourcesReq>({
        queryKey: ['map-view'],
        queryFn: async () => {
            const data = await requestNew<GetResourcesReq>({
                url: '/map-view',
                method: 'GET',
            });
            if (data) {
                dispatch(setMapResources(data));
            }
            return data;
        }
    });
};

export const routePlanner = ({ destinationType, currentLocation }: { destinationType: string, currentLocation: number[]; }) => {
    const response = requestNew({
        url: '/route-plan',
        method: 'POST',
        data: { destinationType, currentLocation }
    });
    return response;
};

export const report = ({ type, description, location }: { description: string, type: string, location: string[]; }) => {
    const response = requestNew({
        url: '/report/',
        method: 'POST',
        data: { type, description, location }
    });
    return response;
};

export const useRoutePlanner = () => {
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: routePlanner,
        onSuccess: (data) => {
            dispatch(setPlannerCoordinates((data as any)?.data?.destination.location.coordinates))
            console.log("routedata:", (data as any)?.data?.destination.location.coordinates);
        }
    });
};

export const useReport = () => {
    return useMutation({
        mutationFn: report
    });
}; 