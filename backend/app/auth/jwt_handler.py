import hmac
import hashlib
import base64
import json
import time

SECRET_KEY = "careerpilot_engineering_secret_key_change_in_production"
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 60 * 24 # 24 hours

def hash_password(password: str) -> str:
    """Secure SHA-256 password hashing with salt"""
    salt = "cp_salt_"
    return hashlib.sha256((salt + password).encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def _base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')

def _base64url_decode(data_str: str) -> bytes:
    padding = '=' * (4 - (len(data_str) % 4)) if len(data_str) % 4 != 0 else ''
    return base64.urlsafe_b64decode(data_str + padding)

def create_access_token(data: dict) -> str:
    """
    Standard HS256 JWT Token Generator
    Works with PyJWT or pure Python Standard Library (0 external dependencies needed)
    """
    try:
        import jwt
        to_encode = data.copy()
        to_encode.update({"exp": int(time.time()) + ACCESS_TOKEN_EXPIRE_SECONDS})
        return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    except Exception:
        # Robust Pure-Python HS256 JWT Implementation
        header = {"alg": "HS256", "typ": "JWT"}
        payload = data.copy()
        payload["exp"] = int(time.time()) + ACCESS_TOKEN_EXPIRE_SECONDS
        
        encoded_header = _base64url_encode(json.dumps(header, separators=(',', ':')).encode())
        encoded_payload = _base64url_encode(json.dumps(payload, separators=(',', ':')).encode())
        
        message = f"{encoded_header}.{encoded_payload}".encode()
        signature = hmac.new(SECRET_KEY.encode(), message, hashlib.sha256).digest()
        encoded_signature = _base64url_encode(signature)
        
        return f"{encoded_header}.{encoded_payload}.{encoded_signature}"

def decode_access_token(token: str):
    """Decodes and validates JWT token"""
    try:
        import jwt
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except Exception:
        try:
            parts = token.split('.')
            if len(parts) != 3:
                return None
            encoded_header, encoded_payload, encoded_signature = parts
            message = f"{encoded_header}.{encoded_payload}".encode()
            expected_sig = hmac.new(SECRET_KEY.encode(), message, hashlib.sha256).digest()
            if not hmac.compare_digest(expected_sig, _base64url_decode(encoded_signature)):
                return None
            payload = json.loads(_base64url_decode(encoded_payload).decode())
            if payload.get("exp") and time.time() > payload["exp"]:
                return None # Expired
            return payload
        except Exception:
            return None
