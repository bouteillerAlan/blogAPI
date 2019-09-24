# BlogAPI
> It's a wip. *Jonh Doe*

# Information 
#### Framework
[Nest](https://github.com/nestjs) repository.
#### License
[MIT](https://en.wikipedia.org/wiki/MIT_License)
#### Package manager
```bash
$ yarn
```
#### Script

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
# or
$ yarn launch

# production mode
$ yarn run start:prod
```

# ``.env`` file 

Put in ``./``

```
# env file for dev
db_uri          = 'xxxxx'
db_port         = 'xxxxx'
db_name         = 'xxxxx'
db_user         = 'xxxxx'
db_pass         = 'xxxxx'
bcrypt_salt     = 12
secret          = 123456789
smtp_host       = 'xxxxx'
smtp_port       = 'xxxxx'
smtp_user       = 'xxxxx'
smtp_pass       = 'xxxxx'
smtp_user_from  = 'xxxxx'
smtp_mail_from  = 'xxxxx'
smtp_dirname    = 'xxxxx'
```

For ``bcrypt_salt`` [see here](https://www.npmjs.com/package/bcrypt#a-note-on-rounds).

``secret`` is use for jwt. 

# Authentication (``HTTPS`` only)
 - Make ``post`` request at ``/auth`` : 
 ```json
 {
    "name": "test",
    "password": "test"
 }
 ```
 - recover the jwt in the response : 
 ```json
 {
    "access_token": "xxxxx"
 }
 ```
 - use it for ``get``, ``put``, ``push``, ``delete`` via the header :
 ```
 Authorization: Bearer xxxxx
 ```
 - the token is valid for 120s

# Route mapping

 \[get\] : route type 
 
 \[dev\] : use in dev only
 
 \[aut\] : need authentication (wip)

 - ``/hello`` \[get\] \[dev\] return "hello world"
 - ``/author/all`` \[get\] \[aut\] return all author
 - ``/author/:id`` \[get\] \[aut\] return one author by id
 - ``/author/add`` \[post\] \[aut\] add one author (the password must be encrypted in front)
 - ``/author/add/encrypted`` \[post\] \[dev\] \[aut\] add one author (the password is encrypted in the back)
 - ``/author/:id`` \[put\] \[aut\] edit one author by id
 - ``/author/:id`` \[delete\] \[aut\] delete one author by id
 - ``/content/all`` \[get\] \[aut\] return all content
 - ``/content/:id`` \[get\] \[aut\] return one content by id
 - ``/content/add`` \[post\] \[aut\] add one content (the password must be encrypted in front)
 - ``/content/add/encrypted`` \[post\] \[dev\] \[aut\] add one content (the password is encrypted in the back)
 - ``/content/:id`` \[put\] \[aut\] edit one content by id
 - ``/content/:id`` \[delete\] \[aut\] delete one content by id
 - ``/categories/all`` \[get\] \[aut\] return all content
 - ``/categories/:id`` \[get\] \[aut\] return one content by id
 - ``/categories/add`` \[post\] \[aut\] add one content (the password must be encrypted in front)
 - ``/categories/add/encrypted`` \[post\] \[dev\] \[aut\] add one content (the password is encrypted in the back)
 - ``/categories/:id`` \[put\] \[aut\] edit one content by id
 - ``/categories/:id`` \[delete\] \[aut\] delete one content by id
 - ``/auth`` \[post\] login
 - ``/auth/validate`` \[get\] \[aut\] \[dev\] test the jwt, return ``req.user``
 - ``/mailer/send`` \[post\] \[aut\] send email via smtp (see ``.env`` file)
 
# Mongo schemas
#### Author
```js
export const AuthorSchema = new mongoose.Schema({
   name:          {type: String, required: [true, 'name is required.']},
   password:      {type: String, required: [true, 'password is required.']},
   token:         {type: String},
});
```

#### Categories
```js
export const CategoriesSchema = new mongoose.Schema({
    name:          {type: String, required: [true, 'name is required.']},
});
```

#### Content
```js
export const ContentSchema = new mongoose.Schema({
    title:       {type: String, required: [true, 'title is required.']},
    author:      {type: mongoose.Schema.ObjectId, required: [true, 'author is required.']},
    category:    {type: mongoose.Schema.ObjectId, required: [true, 'category is required.']},
    date:        {type: Date, default: new Date()},
    content:     {type: String, required: [true, 'content is required.']},
});
```
