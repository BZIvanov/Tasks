### Experienced issues

1. TypeScript complains with import React after installing _react-router-dom_.

**Fix:** delete node_modules folder and package-lock.json file and then install them back again.

2. When using 2 Material UI elements as parent and child, if the child is in external component file it doesn't inherit the styles.

**Fix:** in the child Material UI element spread them from the props like below:

```javascript
<GridListTile style={{ ...props.style }}></GridListTile>
```
