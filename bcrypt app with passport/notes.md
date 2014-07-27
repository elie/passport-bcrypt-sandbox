## Objectives:

1. Explain what authentication is and why we need it
2. Explain the difference between obfuscation, encoding, encryption and hashing
3. Explain what salting is and why we need it
4. Explain the ways that passwords can be cracked 
5. Learn why we use bcrypt and how it compares to other algorithms
6. Install bcrypt and learn how to store passwords in our DB securely
7. Query our DB for hashed passwords and log users in
8. See our problem 

## Notes about security + protecting our data

STORING PASSWORDS IN PLAIN TEXT IS BAD....VERY BAD!

### Encoding
Example - encodeURI (use for existing URLS)
- encodeURIcomponent - use for strings)

encodeURI("google.com?q=What does encoding do?") returns 

### Obfuscation
Example - minifying JS code so that it is hard to look at
<http://jscompress.com/> 

### Encryption

secret code between two people where the only one's who know the key are the two parties

SSL 

### Hashing

Blowfish


### How passwords are cracked and how bcrypt protects
1. Brute Force
2. Dictionary Attacks
3. Rainbow Tables/Trees

### Salting

What does it do?

## Let's get into the code: