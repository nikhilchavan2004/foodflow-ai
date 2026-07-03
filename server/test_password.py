from app.auth.password import hash_password, verify_password

password = "FoodFlow@123"

hashed_password = hash_password(password)

print("Hashed Password:")
print(hashed_password)

print("\nPassword Match:")
print(verify_password(password, hashed_password))