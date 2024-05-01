<script lang="ts">
    import Planet from "./Planet.svelte";
</script>

<Planet
    atmosphere
    radius={6}
    rotationSpeed={0.01}
    cloudsRotationSpeed={-0.05}
    tiltRadians={0.409}
    texturesPaths={{
        map: "/earth/2k_earth_daymap.jpg",
        lights: "/earth/2k_earth_nightmap.jpg",
        clouds: "/earth/2k_earth_clouds.jpg",
        normalMap: "/earth/2k_earth_normal_map.jpg",
        specularMap: "/earth/2k_earth_specular_map.jpg"
    }}
/>