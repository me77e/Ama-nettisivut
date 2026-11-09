
import json
from pathlib import Path

# Projektin pääkansio
ROOT = Path(__file__).resolve().parent.parent

# Kansioiden sijainnit
FOLDERS = [
    ROOT / "content" / "uudet-tanssiteokset",
    ROOT / "content" / "uudet-projektit",
]

for folder in FOLDERS:
    # Etsitään kaikki JSON-tiedostot paitsi index.json
    files = sorted(
        file.name
        for file in folder.glob("*.json")
        if file.name != "index.json"
    )

    # Muodostetaan automaattinen tiedostoluettelo
    index_file = folder / "index.json"

    index_file.write_text(
        json.dumps(files, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Päivitetty: {index_file} ({len(files)} tiedostoa)")
