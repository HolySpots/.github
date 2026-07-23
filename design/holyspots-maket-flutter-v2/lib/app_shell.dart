import 'package:flutter/material.dart';
import 'theme.dart';
import 'responsive.dart';
import 'screens_lists.dart';
import 'spot_editor_screen.dart';

class _Nav {
  final String label;
  final IconData icon;
  const _Nav(this.label, this.icon);
}

const _navItems = [
  _Nav('Города', Icons.location_city),
  _Nav('Споты', Icons.place_outlined),
  _Nav('Маршруты', Icons.route_outlined),
  _Nav('Карты', Icons.map_outlined),
  _Nav('Места', Icons.hotel_outlined),
  _Nav('Направления', Icons.directions_outlined),
  _Nav('Отзывы', Icons.rate_review_outlined),
];

class AppShell extends StatefulWidget {
  final VoidCallback onLogout;
  const AppShell({super.key, required this.onLogout});
  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int index = 0;
  bool editorOpen = false;

  void _openEditor() => setState(() => editorOpen = true);

  Widget _screen() {
    if (editorOpen) return SpotEditorScreen(onClose: () => setState(() => editorOpen = false));
    switch (index) {
      case 0: return const CitiesScreen();
      case 1: return SpotsScreen(onEdit: _openEditor);
      case 2: return const RoutesScreen();
      case 3: return const MapsScreen();
      case 4: return const PlacesScreen();
      case 5: return const DirectionsScreen();
      default: return const ReviewsScreen();
    }
  }

  void _select(int i) => setState(() { index = i; editorOpen = false; });

  @override
  Widget build(BuildContext context) {
    if (isPhone(context)) {
      return Scaffold(
        backgroundColor: HS.canvas,
        appBar: AppBar(
          backgroundColor: HS.original ? const Color(0xFFCFE0E7) : Colors.white,
          elevation: 0,
          foregroundColor: HS.textDark,
          title: Row(children: [_logo(26), const SizedBox(width: 8), Text(_navItems[index].label, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w500))]),
        ),
        drawer: Drawer(child: _navList(context, dense: false)),
        body: _screen(),
      );
    }
    final desktop = isDesktop(context);
    return Scaffold(
      backgroundColor: HS.canvas,
      body: Row(children: [
        Container(
          width: desktop ? 240 : 76,
          color: HS.original ? const Color(0xFFCFE0E7) : Colors.white,
          child: _sidebar(context, desktop),
        ),
        const VerticalDivider(width: 1, color: HS.border),
        Expanded(child: _screen()),
      ]),
    );
  }

  Widget _sidebar(BuildContext c, bool desktop) => Column(children: [
        Container(
          height: 60,
          padding: EdgeInsets.symmetric(horizontal: desktop ? 18 : 0),
          alignment: desktop ? Alignment.centerLeft : Alignment.center,
          child: Row(mainAxisSize: MainAxisSize.min, children: [_logo(30), if (desktop) ...[const SizedBox(width: 9), const Text('HolySpots', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500))]]),
        ),
        const Divider(height: 1, color: HS.border),
        Expanded(
          child: ListView(padding: const EdgeInsets.symmetric(vertical: 8), children: [
            for (var i = 0; i < _navItems.length; i++) _navTile(i, desktop),
          ]),
        ),
        const Divider(height: 1, color: HS.border),
        _logoutTile(desktop),
      ]);

  Widget _navTile(int i, bool desktop) {
    final on = i == index && !editorOpen;
    final item = _navItems[i];
    final content = desktop
        ? Row(children: [Icon(item.icon, size: 20, color: on ? HS.brand : HS.muted), const SizedBox(width: 12), Text(item.label, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: on ? HS.brandDark : HS.muted))])
        : Icon(item.icon, size: 22, color: on ? HS.brand : HS.muted);
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: desktop ? 10 : 12, vertical: 2),
      child: Material(
        color: on ? HS.blueChipBg : Colors.transparent,
        borderRadius: BorderRadius.circular(9),
        child: InkWell(
          borderRadius: BorderRadius.circular(9),
          onTap: () => _select(i),
          child: Container(height: 44, alignment: desktop ? Alignment.centerLeft : Alignment.center, padding: EdgeInsets.symmetric(horizontal: desktop ? 12 : 0), child: content),
        ),
      ),
    );
  }

  Widget _logoutTile(bool desktop) => Padding(
        padding: const EdgeInsets.all(10),
        child: InkWell(
          borderRadius: BorderRadius.circular(9),
          onTap: widget.onLogout,
          child: Container(
            height: 44, alignment: desktop ? Alignment.centerLeft : Alignment.center, padding: EdgeInsets.symmetric(horizontal: desktop ? 12 : 0),
            child: desktop
                ? Row(children: const [Icon(Icons.logout, size: 20, color: HS.muted), SizedBox(width: 12), Text('admin', style: TextStyle(fontSize: 14, color: HS.muted)), Spacer(), Text('Выход', style: TextStyle(fontSize: 13, color: HS.faint))])
                : const Icon(Icons.logout, size: 22, color: HS.muted),
          ),
        ),
      );

  Widget _navList(BuildContext c, {bool dense = true}) => SafeArea(
        child: Column(children: [
          Container(height: 60, padding: const EdgeInsets.symmetric(horizontal: 18), alignment: Alignment.centerLeft, child: Row(children: [_logo(30), const SizedBox(width: 9), const Text('HolySpots', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500))])),
          const Divider(height: 1, color: HS.border),
          Expanded(
            child: ListView(children: [
              for (var i = 0; i < _navItems.length; i++)
                ListTile(
                  leading: Icon(_navItems[i].icon, color: i == index ? HS.brand : HS.muted),
                  title: Text(_navItems[i].label, style: TextStyle(fontWeight: FontWeight.w500, color: i == index ? HS.brandDark : HS.textDark)),
                  selected: i == index && !editorOpen,
                  selectedTileColor: HS.blueChipBg,
                  onTap: () { _select(i); Navigator.pop(c); },
                ),
            ]),
          ),
          const Divider(height: 1, color: HS.border),
          ListTile(leading: const Icon(Icons.logout, color: HS.muted), title: const Text('Выход (admin)'), onTap: widget.onLogout),
        ]),
      );

  Widget _logo(double size) => ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Image.asset('assets/holyspots_app_icon.png', width: size, height: size, fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(width: size, height: size, color: HS.brand, alignment: Alignment.center, child: Text('H', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: size * .5)))),
      );
}
