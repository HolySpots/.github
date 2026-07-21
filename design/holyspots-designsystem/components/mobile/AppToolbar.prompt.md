Mobile top bar (56px): back glyph, 18px title, right glyph actions (search, map).

```jsx
<AppToolbar title="Holy Spots" actions={[{icon:'icon_search.png',label:'Search'},{icon:'icon_map.png',label:'Map'}]} />
<AppToolbar transparent onBack={fn} actions={[{icon:'icon_map_white.png',label:'Map'}]} />
```

Set `assets` when the page is not two levels below the project root.
