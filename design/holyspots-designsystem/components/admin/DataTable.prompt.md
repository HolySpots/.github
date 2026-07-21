Admin table (.regions/.spots pattern): 100px rows, cover-image first cell, bold name, action buttons right.

```jsx
<DataTable columns={['image','title','actions']} onRowClick={open}
  rows={[[photoUrl,'Vrindavan',<IconButton icon="…/remove.png" label="Remove"/>]]} />
```
