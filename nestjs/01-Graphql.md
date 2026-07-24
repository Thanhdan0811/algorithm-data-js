```
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

- `Character` is GraphQL Object type.
- `name, appearsIn` is fields
- `String` is built-in Scala types.
- `String!` is `Non-null type`, GraphQL service promises give value.
- `[Episode!]!` represents an `List type of Episode object`, `Non-null` so will get array (0 or items).
- Since `Episode!` so within the list, every item in array to be an `Episode` object. Means item not be null.


- `Arguments`

```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

- All arguments in GraphQL are passed by name specifically, 
- `length` field has one defined argument called `unit`. `METET` is default value, if unit argument is not passed.

# Scalar types
- `Int, Float, String, Boolean, ID`
- `enum Episode { NEWHOPE EMPIRE JEDI }`

# Interface type

```
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
```

# Union types
- `union SearchResult = Human | Droid | Starship`