## Routes

### Available websites for a given date in all types of robots

```
http://localhost:3100/websites-list/uk?date=2020-07-28
```

- uk - targeted market
- date - (optional, default today) for which date websites should be targeted

### Summary data

```
http://localhost:3100/summary/uk?date=2020-07-24&startDate=2020-07-15
```

- uk - targeted market
- date - (optional, default today) for which date websites should be targeted
- startDate - from which date historical search should start

### Incorrect values

```
http://localhost:3100/incorrect-detailed/uk??date=2020-07-24&website=Very
```
