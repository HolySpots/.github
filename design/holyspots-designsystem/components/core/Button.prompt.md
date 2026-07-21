Color-coded HolySpots action button (admin style): use when any surface needs a standalone action.

```jsx
<Button variant="save">Save</Button>
<Button variant="secondary" icon="assets/admin-icons/add.png">Add region</Button>
<Button variant="delete" fixedWidth>Delete</Button>
```

Variants map to admin.less: save=#47bfed fill, secondary=cloud+blue (add/edit), cancel=cloud+coral, delete=coral fill, primary=#00ace8 (login). `size="md"` gives 44px; `icon` left-aligns label with a glyph.
