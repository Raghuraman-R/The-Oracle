from pathlib import Path
import os

from database.database import engine
from database.models import Base

db_path = Path("oracle.db")

if db_path.exists():
    os.remove(db_path)
    print("🗑️ Old database deleted.")

Base.metadata.create_all(bind=engine)

print("✅ Fresh Oracle database created successfully!")