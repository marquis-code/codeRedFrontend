
// import { hospital_apis } from "@/apiFactory/modules/hospital";
// import { useCustomToast } from '@/composables/core/useCustomToast';

// const { showToast } = useCustomToast();
// const router = useRouter();

// export const useCreateCompany = () => {
//   const loading = ref(false);
//   const payload = ref({
//     hospitalName: "",
//     email: "", // Added - missing in original
//     password: "",
//     contactInformation: "",
//     address: "",
//     website: "",
//     operatingHours: [] as Array<{
//       day: string;
//       open?: string;
//       close?: string;
//       is24Hours: boolean;
//     }>,
//     facilityType: "",
//     availableSpecialties: [] as string[],
//     emergencyServices: "",
//     capacity: "",
//     emergencyEquipment: [] as Array<{
//       name: string;
//       details: string;
//     }>,
//     emergencyContactNumber: "",
//     emergencyDepartment: "",
//     doctorOnDutyContact: [] as Array<{
//       specialty: string;
//       name: string;
//       contact: string;
//     }>,
//     acceptedInsuranceProviders: [] as string[],
//     emergencyPaymentPolicies: [] as string[],
//     expectedResponseTime: "",
//     dedicatedPointOfContact: "",
//     communicationProtocols: "",
//     airAmbulance: "",
//     telemedicineServices: "",
//     latitude: 0, // Changed from string to number
//     longitude: 0, // Changed from string to number
//     location: {
//       type: "Point",
//       coordinates: [0, 0] as [number, number]
//     }
//   });

//   const createCompany = async () => {
//     // Ensure location coordinates are synced with latitude/longitude
//     payload.value.location.coordinates = [
//       payload.value.longitude,
//       payload.value.latitude
//     ];

//     loading.value = true;
//     try {
//       const res = await hospital_apis.$_create_company(payload.value) as any;
//       if (res.type !== 'ERROR') {
//         showToast({
//           title: "Success",
//           message: "Company was created successfully",
//           toastType: "success",
//           duration: 3000
//         });
//         window.location.href = '/business/success';
//         router.push('/business/signup/success');
//       } else {
//         showToast({
//           title: "Error",
//           message: "Failed to create the company",
//           toastType: "error",
//           duration: 3000
//         });
//       }
//     } catch (error: any) {
//       showToast({
//         title: "Error",
//         message: error.message || "An unexpected error occurred",
//         toastType: "error",
//         duration: 3000
//       });
//     } finally {
//       loading.value = false;
//     }
//   };

//   return { createCompany, payload, loading };
// };

import { hospital_apis } from "@/apiFactory/modules/hospital";
import { useCustomToast } from '@/composables/core/useCustomToast';

const { showToast } = useCustomToast();
const router = useRouter();

export const useCreateCompany = () => {
  const loading = ref(false);
  const payload = ref({
    hospitalName: "",
    email: "",
    password: "",
    contactInformation: "",
    address: "",
    website: "",
    operatingHours: [] as Array<{
      day: string;
      startTime?: string;
      endTime?: string;
      is24Hours?: boolean;
    }>,
    facilityType: "",
    availableSpecialties: [] as string[], // Fixed: should be string[]
    emergencyServices: "",
    capacity: "",
    emergencyEquipment: [] as Array<{
      name: string;
      details: string;
    }>,
    emergencyContactNumber: "",
    emergencyDepartment: "",
    doctorOnDutyContact: [] as Array<{ // Fixed: should be direct array
      specialty?: string;
      department?: string;
      name: string;
      contact?: string;
      phone?: string;
    }>,
    acceptedInsuranceProviders: [] as string[],
    emergencyPaymentPolicies: [] as string[],
    expectedResponseTime: "",
    dedicatedPointOfContact: "",
    communicationProtocols: "",
    airAmbulance: "",
    telemedicineServices: "",
    latitude: 0,
    longitude: 0,
    location: {
      type: "Point",
      coordinates: [0, 0] as [number, number]
    }
  });

  const createCompany = async () => {
    // Ensure location coordinates are synced with latitude/longitude
    payload.value.location.coordinates = [
      payload.value.longitude,
      payload.value.latitude
    ];

    loading.value = true;
    try {
      const res = await hospital_apis.$_create_company(payload.value) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Company was created successfully",
          toastType: "success",
          duration: 3000
        });
        window.location.href = '/business/success';
        router.push('/business/signup/success');
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