const https = require('https');
const fs = require('fs');
const path = require('path');

const ASSETS = [
    { name: "Saturn V", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Saturn%20V/Saturn%20V.glb" },
    { name: "Space Shuttle", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Space%20Shuttle%20(A)/Space%20Shuttle%20(A).glb" },
    { name: "Hubble Telescope", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Hubble%20Space%20Telescope%20(A)/Hubble%20Space%20Telescope%20(A).glb" },
    { name: "James Webb Telescope", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/James%20Webb%20Space%20Telescope%20(A)/James%20Webb%20Space%20Telescope%20(A).glb" },
    { name: "Mobile Launcher", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Mobile%20Launcher/Mobile%20Launcher%20(assembled).glb" },
    { name: "ISS", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/International%20Space%20Station%20(ISS)%20(A)/International%20Space%20Station%20(ISS)%20(A).glb" },
    { name: "VAB", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Vehicle%20Assembly%20Building%20(VAB)/Vehicle%20Assembly%20Building%20(VAB).glb" },
    { name: "Solid Rocket Booster", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Space%20Shuttle%20Parts/Solid%20Rocket%20Booster.glb" },
    { name: "Gantry", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Gantry/Gantry.glb" },
    { name: "Jupiter-C", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Explorer%20Jupiter-C%20Rocket/Explorer%20Jupiter-C%20Rocket.glb" },
    { name: "Astronaut EMU", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Extravehicular%20Mobility%20Unit/Extravehicular%20Mobility%20Unit.glb" },
    { name: "Voyager", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Voyager%20Probe%20(A)/Voyager%20Probe%20(A).glb" },
    { name: "Perseverance", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Mars%202020%20Perseverance%20Rover/Mars%202020%20Perseverance%20Rover.glb" },
    { name: "Ingenuity", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Ingenuity%20Mars%20Helicopter/Ingenuity%20Mars%20Helicopter.glb" },
    { name: "Deep Space 1", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Deep%20Space%201/Deep%20Space%201.glb" },
    { name: "Asteroid Bennu", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/1999%20RQ36%20asteroid/1999%20RQ36%20asteroid.glb" },
    { name: "OSIRIS-REx", url: "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Origins%2C%20Spectral%20Interpretation%2C%20Resource%20Identification%2C%20and%20Security%20-%20Regolith%20Explorer%20(OSIRIS-REx)/OSIRIS-REx.glb" },
];

const TARGET_DIR = path.join(__dirname, '../simlab/public/assets/models');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    console.log(`Starting download of ${ASSETS.length} NASA 3D assets...`);
    for (const asset of ASSETS) {
        // Sanitize filename
        let filename = asset.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.glb';
        // Clean up double dashes
        filename = filename.replace(/-+/g, '-').replace(/^-|-$/g, '');

        const dest = path.join(TARGET_DIR, filename);

        // Skip if already exists
        if (fs.existsSync(dest)) {
            console.log(`[SKIP] ${asset.name} already exists at ${filename}`);
            continue;
        }

        console.log(`[DOWNLOADING] ${asset.name}...`);
        try {
            await downloadFile(asset.url, dest);
            console.log(`  -> Saved to ${filename}`);
        } catch (e) {
            console.error(`  -> ERROR: ${e.message}`);
        }
    }
    console.log('\nAll downloads complete!');
}

main();
