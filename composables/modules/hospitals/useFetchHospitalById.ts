import { hospital_apis } from "@/apiFactory/modules/hospital";
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useFetchHospitalById = () => {
  const loading = ref(false);
  const hospital = ref(null);

  const { showToast } = useCustomToast();

  const fetchHospitalById = async (id: string | number) => {
    loading.value = true;
    try {
      const res = await hospital_apis.$_fetch_hospital_by_id(id);
      hospital.value = res.data;
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch hospital",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  return { fetchHospitalById, hospital, loading };
};
