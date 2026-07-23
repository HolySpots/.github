import 'package:flutter/material.dart';
import 'theme.dart';
import 'responsive.dart';
import 'common.dart';
import 'screens_common.dart';
import 'store.dart';
import 'models.dart';

void _reorder<T>(List<T> list, int o, int n, VoidCallback update) {
  if (n > o) n--;
  final it = list.removeAt(o);
  list.insert(n, it);
  update();
}

Future<bool> _confirmDelete(BuildContext c, String what, String name) async {
  return await showDialog<bool>(
        context: c,
        builder: (_) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          title: Row(children: [
            Container(
              width: 44, height: 44,
              decoration: BoxDecoration(color: HS.coralBg, borderRadius: BorderRadius.circular(12)),
              child: const Icon(Icons.delete_outline, color: HS.coral),
            ),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
              Text('Удалить $what?', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w500)),
              Text(name, style: const TextStyle(fontSize: 13, color: HS.muted)),
            ])),
          ]),
          content: const Text('Запись и все связанные данные будут удалены без возможности восстановления.',
              style: TextStyle(fontSize: 14, color: HS.muted, height: 1.5)),
          actions: [
            TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('Отмена', style: TextStyle(color: HS.muted))),
            FilledButton(
              style: FilledButton.styleFrom(backgroundColor: HS.coral),
              onPressed: () => Navigator.pop(c, true),
              child: const Text('Удалить'),
            ),
          ],
        ),
      ) ??
      false;
}

// ─────────────────────────── Cities ───────────────────────────
class CitiesScreen extends StatefulWidget {
  const CitiesScreen({super.key});
  @override
  State<CitiesScreen> createState() => _CitiesScreenState();
}

class _CitiesScreenState extends State<CitiesScreen> {
  final list = Store.I.cities;
  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Города',
        count: '${list.length} записи',
        footer: 'Порядок в приложении — перетаскиванием (⋮⋮)',
        headerActions: [primaryButton('Добавить', onTap: () => setState(() => list.add(City('new${list.length}', 'Новый город', '', '—', 0, 0, 0))))],
        child: Column(children: [
          if (wide) columnHeader(const [Col(2, Text('ID')), Col(3, Text('Название')), Col(5, Text('Информация')), Col(2, Text('Спотов')), Col(2, Text('Страна'))]),
          Expanded(
            child: ReorderList(
              itemCount: list.length,
              onReorder: (o, n) => _reorder(list, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = list[i];
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide,
                  phoneTitle: x.name, phoneSubtitle: x.info,
                  cols: [
                    Col(2, muted(x.id, size: 12)),
                    Col(3, strong(x.name)),
                    Col(5, muted(x.info)),
                    Col(2, Text('${x.spots}')),
                    Col(2, muted(x.country)),
                  ],
                  actions: [
                    rowAction('Изм.'),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, 'город', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Spots ───────────────────────────
class SpotsScreen extends StatefulWidget {
  final VoidCallback? onEdit;
  const SpotsScreen({super.key, this.onEdit});
  @override
  State<SpotsScreen> createState() => _SpotsScreenState();
}

class _SpotsScreenState extends State<SpotsScreen> {
  final list = Store.I.spots;
  String cityFilter = 'Все';

  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    final shown = cityFilter == 'Все' ? list : list.where((s) => s.city == cityFilter).toList();
    final cities = ['Все', ...{for (final s in list) s.city}];
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Споты',
        count: '${shown.length}',
        footer: 'Показано 1–${shown.length} из ${list.length}',
        headerActions: [
          PopupMenuButton<String>(
            onSelected: (v) => setState(() => cityFilter = v),
            itemBuilder: (_) => cities.map((c) => PopupMenuItem(value: c, child: Text(c))).toList(),
            child: filterChip('Город: $cityFilter'),
          ),
          const SizedBox(width: 10),
          primaryButton('Добавить', onTap: widget.onEdit),
        ],
        child: Column(children: [
          if (wide) columnHeader(const [Col(5, Text('Название')), Col(3, Text('Город')), Col(2, Text('Тип')), Col(3, Text('Координаты')), Col(2, Text('Фото'))]),
          Expanded(
            child: ReorderList(
              itemCount: shown.length,
              onReorder: (o, n) => _reorder(shown, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = shown[i];
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide,
                  phoneTitle: x.name, phoneSubtitle: '${x.city} · ${x.type}',
                  cols: [
                    Col(5, strong(x.name)),
                    Col(3, muted(x.city)),
                    Col(2, hsTag(x.type, blue: x.type == 'Храм')),
                    Col(3, muted(x.coords, size: 13)),
                    Col(2, muted(x.photos > 0 ? '${x.photos} фото' : '—', size: 12)),
                  ],
                  actions: [
                    rowAction('Изм.', onTap: widget.onEdit),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, 'спот', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Routes (two-level) ───────────────────────────
class RoutesScreen extends StatefulWidget {
  const RoutesScreen({super.key});
  @override
  State<RoutesScreen> createState() => _RoutesScreenState();
}

class _RoutesScreenState extends State<RoutesScreen> {
  final list = Store.I.routes;
  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Маршруты',
        count: '2 группы · 3',
        footer: 'Порядок и вложенность — перетаскиванием (⋮⋮)',
        headerActions: [primaryButton('Группа', onTap: () => setState(() => list.add(RouteItem('Новая группа', '', 0, isGroup: true))))],
        child: Column(children: [
          if (wide) columnHeader(const [Col(4, Text('Название')), Col(6, Text('Информация')), Col(2, Text('Фото'))]),
          Expanded(
            child: ReorderList(
              itemCount: list.length,
              onReorder: (o, n) => _reorder(list, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = list[i];
                final titleWidget = Row(mainAxisSize: MainAxisSize.min, children: [
                  if (!x.isGroup) const Padding(padding: EdgeInsets.only(right: 8), child: Text('└', style: TextStyle(color: Color(0xFFA9BCC4)))),
                  Flexible(child: strong(x.name)),
                  if (x.isGroup) ...[const SizedBox(width: 8), hsTag('группа')],
                ]);
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide,
                  bg: x.isGroup ? const Color(0xFFF7FBFD) : null,
                  indent: x.isGroup ? 0 : (wide ? 22 : 14),
                  phoneTitle: x.name, phoneSubtitle: x.info,
                  cols: [
                    Col(4, titleWidget),
                    Col(6, muted(x.info)),
                    Col(2, muted(x.photos > 0 ? '${x.photos} фото' : '—', size: 12)),
                  ],
                  actions: [
                    if (x.isGroup) rowAction('+ Влож.'),
                    rowAction('Изм.'),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, x.isGroup ? 'группу' : 'маршрут', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Maps ───────────────────────────
class MapsScreen extends StatefulWidget {
  const MapsScreen({super.key});
  @override
  State<MapsScreen> createState() => _MapsScreenState();
}

class _MapsScreenState extends State<MapsScreen> {
  final list = Store.I.maps;
  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Карты',
        count: '${list.length} записи',
        footer: 'Порядок загрузки в приложении — перетаскиванием (⋮⋮)',
        headerActions: [primaryButton('Загрузить .bin', icon: Icons.upload_file, onTap: () => setState(() => list.add(MapItem('Новая карта', 'new_offline.bin', '0 МБ', '23.07.2026'))))],
        child: Column(children: [
          if (wide) columnHeader(const [Col(5, Text('Название')), Col(4, Text('Файл')), Col(2, Text('Размер')), Col(3, Text('Обновлена'))]),
          Expanded(
            child: ReorderList(
              itemCount: list.length,
              onReorder: (o, n) => _reorder(list, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = list[i];
                final binBadge = Container(
                  width: 30, height: 30, alignment: Alignment.center,
                  decoration: BoxDecoration(color: HS.blueChipBg, borderRadius: BorderRadius.circular(7)),
                  child: const Text('BIN', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HS.brandDark)),
                );
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide,
                  phoneLeading: binBadge,
                  phoneTitle: x.name, phoneSubtitle: '${x.file} · ${x.size}',
                  cols: [
                    Col(5, Row(children: [binBadge, const SizedBox(width: 10), Flexible(child: strong(x.name))])),
                    Col(4, muted(x.file, size: 13)),
                    Col(2, muted(x.size)),
                    Col(3, muted(x.updated, size: 13)),
                  ],
                  actions: [
                    rowAction('Замен.'),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, 'карту', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Places ───────────────────────────
class PlacesScreen extends StatefulWidget {
  const PlacesScreen({super.key});
  @override
  State<PlacesScreen> createState() => _PlacesScreenState();
}

class _PlacesScreenState extends State<PlacesScreen> {
  final list = Store.I.places;
  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Места',
        count: '${list.length} записи',
        footer: 'Порядок — перетаскиванием (⋮⋮)',
        headerActions: [primaryButton('Добавить', onTap: () => setState(() => list.add(Place('Новое место', '', 'Отель', '—'))))],
        child: Column(children: [
          if (wide) columnHeader(const [Col(2, Text('Фото')), Col(6, Text('Название / адрес')), Col(2, Text('Тип')), Col(2, Text('Город'))]),
          Expanded(
            child: ReorderList(
              itemCount: list.length,
              onReorder: (o, n) => _reorder(list, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = list[i];
                final thumb = Container(width: 40, height: 40, decoration: BoxDecoration(color: const Color(0xFFE3EDF1), borderRadius: BorderRadius.circular(7)));
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide, height: 64,
                  phoneLeading: thumb,
                  phoneTitle: x.name, phoneSubtitle: x.address,
                  cols: [
                    Col(2, thumb),
                    Col(6, Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [strong(x.name), const SizedBox(height: 2), muted(x.address, size: 12)])),
                    Col(2, hsTag(x.type)),
                    Col(2, muted(x.city)),
                  ],
                  actions: [
                    rowAction('Изм.'),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, 'место', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Directions ───────────────────────────
class DirectionsScreen extends StatefulWidget {
  const DirectionsScreen({super.key});
  @override
  State<DirectionsScreen> createState() => _DirectionsScreenState();
}

class _DirectionsScreenState extends State<DirectionsScreen> {
  final list = Store.I.directions;
  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Направления',
        count: '${list.length} записи',
        footer: 'Порядок в приложении — перетаскиванием (⋮⋮)',
        headerActions: [primaryButton('Добавить', onTap: () => setState(() => list.add(Direction('Новое направление', ''))))],
        child: Column(children: [
          if (wide) columnHeader(const [Col(4, Text('Название')), Col(8, Text('Информация'))]),
          Expanded(
            child: ReorderList(
              itemCount: list.length,
              onReorder: (o, n) => _reorder(list, o, n, () => setState(() {})),
              rowBuilder: (c, i) {
                final x = list[i];
                return adminRow(
                  key: ValueKey(x),
                  index: i, wide: wide, height: 60,
                  phoneTitle: x.name, phoneSubtitle: x.info,
                  cols: [Col(4, strong(x.name)), Col(8, muted(x.info))],
                  actions: [
                    rowAction('Изм.'),
                    rowAction('Удал.', coral: true, onTap: () async {
                      if (await _confirmDelete(context, 'направление', x.name)) setState(() => list.remove(x));
                    }),
                  ],
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}

// ─────────────────────────── Reviews (moderation) ───────────────────────────
class ReviewsScreen extends StatefulWidget {
  const ReviewsScreen({super.key});
  @override
  State<ReviewsScreen> createState() => _ReviewsScreenState();
}

class _ReviewsScreenState extends State<ReviewsScreen> {
  final list = Store.I.reviews;
  String filter = 'Все'; // Все | Одобренные | Не одобренные

  @override
  Widget build(BuildContext context) {
    final wide = isWide(context);
    final shown = list.where((r) {
      if (filter == 'Одобренные') return r.status == 'approved';
      if (filter == 'Не одобренные') return r.status == 'pending';
      return true;
    }).toList();

    Widget seg(String label) {
      final on = filter == label;
      return InkWell(
        onTap: () => setState(() => filter = label),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
          color: on ? HS.brand : Colors.white,
          child: Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: on ? Colors.white : HS.muted)),
        ),
      );
    }

    return Padding(
      padding: pagePad(context),
      child: PanelCard(
        title: 'Отзывы',
        count: '${list.length}',
        footer: 'Показано ${shown.length} из ${list.length}',
        headerActions: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(8)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [seg('Все'), const VerticalDivider(width: 1), seg('Одобренные'), const VerticalDivider(width: 1), seg('Не одобренные')]),
            ),
          ),
        ],
        child: ListView.builder(
          itemCount: shown.length,
          itemBuilder: (c, i) {
            final r = shown[i];
            final approved = r.status == 'approved';
            final statusChip = Container(
              padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 4),
              decoration: BoxDecoration(color: approved ? HS.blueChipBg : HS.chipBg, borderRadius: BorderRadius.circular(999)),
              child: Text(approved ? 'Одобрен' : 'На модерации', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: approved ? HS.brandDark : HS.muted)),
            );
            final actions = [
              if (!approved)
                rowAction('✓', filled: true, onTap: () => setState(() => r.status = 'approved')),
              rowAction('✕', coral: true, onTap: () => setState(() => list.remove(r))),
            ];
            if (wide) {
              return Container(
                decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: HS.divider))),
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: Row(children: [
                  SizedBox(width: 130, child: muted(r.date, size: 13)),
                  Expanded(flex: 3, child: strong(r.spot)),
                  SizedBox(width: 40, child: Text(r.mood, style: const TextStyle(fontSize: 18))),
                  Expanded(flex: 5, child: muted(r.text)),
                  Expanded(flex: 3, child: muted(r.email.isEmpty ? '—' : r.email, size: 13)),
                  SizedBox(width: 120, child: Align(alignment: Alignment.centerLeft, child: statusChip)),
                  Row(mainAxisSize: MainAxisSize.min, children: [for (final a in actions) Padding(padding: const EdgeInsets.only(left: 6), child: a)]),
                ]),
              );
            }
            return Container(
              decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: HS.divider))),
              padding: const EdgeInsets.all(12),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [Text(r.mood, style: const TextStyle(fontSize: 18)), const SizedBox(width: 8), Expanded(child: strong(r.spot)), statusChip]),
                const SizedBox(height: 6),
                Text(r.text, style: const TextStyle(fontSize: 13, color: HS.muted, height: 1.4)),
                const SizedBox(height: 4),
                Row(children: [Expanded(child: muted('${r.date}   ${r.email}', size: 12)), ...actions.map((a) => Padding(padding: const EdgeInsets.only(left: 6), child: a))]),
              ]),
            );
          },
        ),
      ),
    );
  }
}
