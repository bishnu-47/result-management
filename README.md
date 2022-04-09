## Result Management

A website where students can login and view their result from anywhere and anytime.

#### Student Functionalities:

- can view result.
- can change password.

#### Admin Functionalities:

- can manage result data.
- can manage student data.
- can mange other admin.

**Note**: requires _.env_ file with following key-values:

```
PORT=<port where website is to be hosted>
MONGO_URI=<mongoDB atlas URI>

NODE_ENV=<development/production>
JWT_SECRET=<jwt secret word>

EMAIL_USERNAME=<email id from which forgot password email is sent>
EMAIL_PASSWORD=<email id password>

```
