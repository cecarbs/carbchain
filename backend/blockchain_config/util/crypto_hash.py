import hashlib
import json


def crypto_hash(*args):
    """
    Return a SHA-256 hash of the given data
    """
    # use sorted so that no matter the order of the input it will always produce the same hash
    
    stringified_args = sorted(map(lambda data: json.dumps(data), args))

    joined_data = ''.join(stringified_args)
    # in order to hash the string, we need to turn encode the data to utf-8
    # turns data into a byte string => utf-8 equivalent representation of our data
    return hashlib.sha256(joined_data.encode("utf-8")).hexdigest()

def main():
    print(f"crypto_hash(1): {crypto_hash(1)}")

if __name__ == "__main__":
    main()