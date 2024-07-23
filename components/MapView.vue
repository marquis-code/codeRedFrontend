   <!-- <template>
    <main class="relative h-full rounded-lg">
      <div id="map" class="h-full w-full z-0 rounded-lg"></div>
      <div class="absolute bottom-6 left-6 z-50 hidden lg:block">
        <HospitalInfoCard />
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import L from 'leaflet';
  
  onMounted(() => {
    const pickup = [6.5195, 3.3676];
    const dropoff = [6.5244, 3.3792];
  
    // Calculate the midpoint of the polyline
    const midpoint = [
      (pickup[0] + dropoff[0]) / 2,
      (pickup[1] + dropoff[1]) / 2,
    ];
  
    // Center the map around the midpoint
    const map = L.map('map').setView(midpoint, 15);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
  
    L.circleMarker(pickup, { color: 'green' }).addTo(map);
    L.circleMarker(dropoff, { color: 'red' }).addTo(map);
  
    L.polyline([pickup, dropoff], { color: 'red' }).addTo(map);
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
   -->

   <template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  hospital: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:distance'])
const mapContainer = ref(null)
const distance = ref(0)

const initMap = async () => {
  // Fetch user's current location
  navigator.geolocation.getCurrentPosition(async (position) => {
    const userLat = position.coords.latitude
    const userLon = position.coords.longitude

    const { default: L } = await import('leaflet')
    const map = L.map(mapContainer.value).setView([userLat, userLon], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)

    const userMarker = L.marker([userLat, userLon]).addTo(map)
    const hospitalMarker = L.marker([props.hospital.lat, props.hospital.lon]).addTo(map)

    const route = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${props.hospital.lon},${props.hospital.lat}?overview=full&geometries=geojson`
    )
    const coordinates = route.data.routes[0].geometry.coordinates
    const latlngs = coordinates.map(([lon, lat]) => [lat, lon])

    const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map)
    map.fitBounds(polyline.getBounds())

    // Calculate and set distance
    distance.value = route.data.routes[0].distance / 1000 // Convert to kilometers
    emit('update:distance', distance.value)
  })
}

onMounted(async () => {
  await initMap()
})

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
