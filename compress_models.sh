#!/bin/bash
cd "/Users/driver444/Desktop/FALAk Space /simlab/public/assets/models/"
echo "Starting Draco compression for NASA models..."
for file in *.glb; do
  if [ -f "$file" ]; then
    echo "Compressing $file with Draco..."
    npx gltf-pipeline -i "$file" -o "compressed_$file" -d
    if [ $? -eq 0 ]; then
      mv "compressed_$file" "$file"
      echo "Successfully compressed $file"
    else
      echo "Failed to compress $file"
      rm -f "compressed_$file"
    fi
  fi
done
echo "Compression complete."
