import requestNew from "@/app/utils/requestNew";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetResourcesReq } from "./map.interface";
import { useAppDispatch } from "@/app/redux/store";
import { setMapResources } from "./mapSlice";

export const useGetResource = () => {
    const dispatch = useAppDispatch();
    return useQuery<GetResourcesReq>({
        queryKey: [''],
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

export const useRoutePlanner = () => {
    return useMutation({
        mutationFn: routePlanner
    });
}; 