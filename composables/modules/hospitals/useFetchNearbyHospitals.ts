import { hospital_apis } from "@/apiFactory/modules/hospital";
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useFetchNearbyHospitals = () => {
  const loading = ref(false);
  const nearbyHospitals = ref([]);

  const { showToast } = useCustomToast();

  const fetchNearbyHospitals = async (latitude: number, longitude: number, maxDistance: number) => {
    loading.value = true;
    try {
      const res = await hospital_apis.$_fetch_nearby_hospitals({ latitude, longitude, maxDistance });
      console.log(res, 'res here')
      nearbyHospitals.value = res.data;
      return res.data
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch nearby hospitals",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  return { fetchNearbyHospitals, nearbyHospitals, loading };
};
