# User Training and Awareness

## Which users have not completed assigned training?

_Requires training data from KnowBe4 or similar._

```j1ql
Find Training as t1
  that assigned User as u
  that !completed Training as t2
  where t1.name = t2.name
  return u.name, u.email, t1.name
```
