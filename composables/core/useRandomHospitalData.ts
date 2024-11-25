import { ref, onMounted } from 'vue';

export default function useRandomHospitalData() {
    const eta = ref<string | null>(null);
    const distance = ref<string | null>(null);

    onMounted(() => {
        // Generate random ETA between 5 and 30 minutes
        const randomEta = Math.floor(Math.random() * (30 - 5 + 1)) + 5;

        // Generate random distance between 1 and 50 kilometers
        const randomDistance = (Math.random() * (50 - 1) + 1).toFixed(2);

        eta.value = `${randomEta}`;
        distance.value = `${randomDistance}`;
    });

    return {
        eta,
        distance,
    };
}
