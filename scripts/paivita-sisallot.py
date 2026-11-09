
import json
from pathlib import Path

# Projektin pääkansio
ROOT = Path(__file__).resolve().parent.parent

# Kansioiden sijainnit
FOLDERS = {
    ROOT / "content" / "uudet-tanssiteokset": "tanssiteokset.json",
    ROOT / "content" / "uudet-projektit": "projektit.json",
}

for folder, filename in FOLDERS.items():
    # Etsitään kaikki JSON-tiedostot paitsi index.json
    files = sorted(
        file.name
        for file in folder.glob("*.json")
        if file.name != "index.json"
    )

    # Muodostetaan automaattinen tiedostoluettelo
    index_file = ROOT / "content" / "luettelot" / filename

    index_file.write_text(
        json.dumps(files, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Päivitetty: {index_file} ({len(files)} tiedostoa)")
