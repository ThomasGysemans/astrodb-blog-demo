<script>
    import { T, Canvas } from "@threlte/core";
    import { OrbitControls } from "@threlte/extras";
    import Earth from "./Earth.svelte";
</script>

<Canvas size={{width: 700, height: 500}}>
    <T.PerspectiveCamera
        makeDefault
        position={[10, 10, 10]}
        on:create={({ref}) => {
            ref.lookAt(0, 0, 0);
        }}
    >
        <OrbitControls
            enableDamping
            enableZoom={false}
            rotateSpeed={0.5}
            autoRotate
        />
    </T.PerspectiveCamera>

    <T.DirectionalLight position={[0, 10, 10]} />
    <T.AmbientLight args={[0xffffff]} intensity={0.1} />

    <Earth />
</Canvas>