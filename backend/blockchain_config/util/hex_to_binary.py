from blockchain_config.util.crypto_hash import crypto_hash

HEX_TO_BINARY_CONVERSION_TABLE = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111'
}

def hex_to_binary(hex_string):
    binary_string = ''

    for char in hex_string:
        binary_string += HEX_TO_BINARY_CONVERSION_TABLE[char]
    
    return binary_string

def main():
    num = 451
    
    # need to remove the 0x prefix
    hex_number = hex(num)[2:]
    print(f'hex_number: {hex_number}')

    # returns 000111000011
    binary_number = hex_to_binary(hex_number)
    print(f'binary_number: {binary_number}')

    # just in case there was something wrong with the conversion function, just convert binary string back to orginal number

    # the second param 2 specifies it is a binary number
    print(int(binary_number, 2))

    # returns a 256 char representation of 'test-data'
    hex_to_binary_crypto_hash = hex_to_binary(crypto_hash('test-data'))
    print(f'hex_to_binary_crypto_hash: {hex_to_binary_crypto_hash}')

if __name__ == '__main__':
    main()