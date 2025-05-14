import { hospital_apis } from "@/apiFactory/modules/hospital";
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useFetchHospitals = () => {
  const loading = ref(false);
  const hospitals = ref([]);

  const { showToast } = useCustomToast();

  const fetchHospitals = async () => {
    loading.value = true;
    try {
      const res = await hospital_apis.$_fetch_hospitals();
      hospitals.value = res.data;
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch hospitals",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchHospitals()
  })

  return { fetchHospitals, hospitals, loading };
};
