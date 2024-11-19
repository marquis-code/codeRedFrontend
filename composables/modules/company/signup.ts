import { company_apis } from "@/apiFactory/modules/company";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const { showToast } = useCustomToast();
const router = useRouter()

export const useCreateCompany = () => {
  const loading = ref(false);
  const payload = ref({
    uuid: uuidv4(), // Generate a UUID when payload is initialized
    password: "",
    hospitalName: "",
    contactInformation: "",
    address: "",
    website: "",
    operatingHours: [],
    facilityType: "",
    availableSpecialties: [],
    emergencyServices: "",
    capacity: "",
    emergencyEquipment: "",
    emergencyContactNumber: "",
    emergencyDepartment: "",
    doctorOnDutyContact: [],
    acceptedInsuranceProviders: "",
    emergencyPaymentPolicies: "",
    expectedResponseTime: "",
    dedicatedPointOfContact: "",
    communicationProtocols: "",
    airAmbulance: "",
    telemedicineServices: "",
    latitude: "",
    longitude: ""
  });

  const createCompany = async () => {
    // Generate a fresh UUID before creating the company (just in case)
    payload.value.uuid = uuidv4();

    loading.value = true;
    try {
      const res = await company_apis.$_create_company(payload.value) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Company was created successfully",
          toastType: "success",
          duration: 3000
        });
        window.location.href = '/business/signup/success'
        router.push('/business/signup/success')
      } else {
        showToast({
          title: "Error",
          message: "Failed to create the company",
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

  return { createCompany, payload, loading };
};
