// composables/useDistanceMatrix.ts
import { ref } from 'vue';
import axios from 'axios';

export function useDistanceMatrix() {
    const distance = ref<string | null>(null);
    const duration = ref<string | null>(null);
    const error = ref<string | null>(null);

    const getDistanceAndTime = async (
        origin: { lat: number; lng: number },
        destination: { lat: number; lng: number }
    ) => {
        try {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            const originStr = `${origin.lat},${origin.lng}`;
            const destinationStr = `${destination.lat},${destination.lng}`;

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/distancematrix/json`,
                {
                    params: {
                        origins: originStr,
                        destinations: destinationStr,
                        key: apiKey,
                    },
                }
            );

            const result = response.data.rows[0]?.elements[0];
            if (result.status === 'OK') {
                distance.value = result.distance.text; // e.g., "5.6 km"
                duration.value = result.duration.text; // e.g., "12 mins"
            } else {
                error.value = `Error: ${result.status}`;
            }
        } catch (err: any) {
            error.value = err.message;
        }
    };

    return { distance, duration, error, getDistanceAndTime };
}
