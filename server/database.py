from pymongo import MongoClient
from config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

employees_collection = db["employees"]
attendance_collection = db["attendance"]

# Create unique index on email (run once)
# employees_collection.create_index("email", unique=True)