# THE BOOK OF MANY FACES API
### Backend Server with auth, mongoose relationships, etc...

## ENTITIES
#### USER
```js
User is comprised of:
    email: {
        type: String,
        required: true,
        unique: true,
    },
        hashedPassword: {
        type: String,
        required: true,
    },
    token: String,
```

#### CHARACTER
```js
Character is comprised of:
	name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    level: {
        type: number,
        required: true,
    },
    class: {
        type: string,
        required: true,
    },
    race: {
        type: string,
        required: true,
    },
    skills: [skillSchema],
    items: [itemSchema],
```
#### ITEMS
```js
Items are comprised of:
	name: {
        type: String,
        required: true,
    },
    description: {
        type: string,
    }
```
#### SKILLS
```js
Skills are comprised of:
	name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        enum: true,
    }
    description: {
        type: string,
    }
```


## ROUTES

### AUTH ROUTES
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### CHARACTER ROUTES
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/chars`               | `chars#index`     |
| GET    | `/chars/:id`           | `chars#show`      |
| POST   | `/chars`               | `chars#create`    |
| PATCH  | `/chars/:id`           | `chars#update`    |
| DELETE | `/chars/:id`           | `chars#delete`    |

### SKILL ROUTES
| Verb   | URI Pattern                | Controller#Action |
|--------|----------------------------|-------------------|
| POST   | `/skills/:charId`          | `skills#create`   |
| PATCH  | `/skills/:charId/:skillId` | `skills#update`   |
| DELETE | `/skills/:charId/:skillId` | `skills#delete`   |

### ITEM ROUTES
| Verb   | URI Pattern                | Controller#Action |
|--------|----------------------------|-------------------|
| POST   | `/items/:charId`           | `items#create`    |
| PATCH  | `/items/:charId/:itemId`   | `items#update`    |
| DELETE | `/items/:charId/:itemId`   | `items#delete`    |
