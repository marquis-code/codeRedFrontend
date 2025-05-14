import { auth_api } from "@/apiFactory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { v4 as uuidv4 } from 'uuid'; // Optional, if you want to use UUIDs
import { useRouter } from 'vue-router';

export const useHospitalSignup = () => {
  const loading = ref(false);
  const router = useRouter();
  const { showToast } = useCustomToast();

  const payload = ref({
    hospitalName: "",
    email: "",
    password: "",
    contactInformation: "",
    address: "",
    website: "",
    operatingHours: [],
    facilityType: "",
    availableSpecialties: [],
    emergencyServices: "",
    capacity: "",
    emergencyEquipment: [],
    emergencyContactNumber: "",
    emergencyDepartment: "",
    doctorOnDutyContact: [],
    acceptedInsuranceProviders: [],
    emergencyPaymentPolicies: [],
    expectedResponseTime: "",
    dedicatedPointOfContact: "",
    communicationProtocols: "",
    airAmbulance: "",
    telemedicineServices: "",
    latitude: null,
    longitude: null
  });

  const signupHospital = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_hospital_signup(payload.value);
      if (res?.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Hospital signup successful",
          toastType: "success",
          duration: 3000
        });
        router.push('/hospital/signup/success');
      } else {
        showToast({
          title: "Error",
          message: res?.message || "Failed to sign up hospital",
          toastType: "error",
          duration: 3000
        });
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "An unexpected error occurred",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  return { signupHospital, payload, loading };
};
