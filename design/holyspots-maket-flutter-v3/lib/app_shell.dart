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
  void _select(int i) => setState(() { index = i; editorOpen = false; });

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

  @override
  Widget build(BuildContext context) {
    if (isPhone(context)) {
      return Scaffold(
        backgroundColor: HS.canvas,
        appBar: AppBar(
          backgroundColor: HS.headerBar,
          elevation: 0,
          foregroundColor: HS.textDark,
          title: Row(children: [_logo(26), const SizedBox(width: 8), Text(_navItems[index].label, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w500))]),
        ),
        drawer: Drawer(child: _drawer(context)),
        body: _screen(),
      );
    }
    return Scaffold(
      backgroundColor: HS.canvas,
      body: Column(children: [
        _topBar(context),
        Expanded(child: _screen()),
      ]),
    );
  }

  Widget _topBar(BuildContext c) => Container(
        height: 60,
        color: HS.headerBar,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(children: [
          _logo(30),
          const SizedBox(width: 9),
          if (isDesktop(c)) const Padding(padding: EdgeInsets.only(right: 8), child: Text('HolySpots', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500))),
          const SizedBox(width: 6),
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(children: [for (var i = 0; i < _navItems.length; i++) _pill(i)]),
            ),
          ),
          const SizedBox(width: 8),
          if (isDesktop(c)) const Padding(padding: EdgeInsets.only(right: 12), child: Text('admin', style: TextStyle(fontSize: 13, color: Color(0xFF41616E)))),
          _iconChip(Icons.logout, widget.onLogout),
        ]),
      );

  Widget _pill(int i) {
    final on = i == index && !editorOpen;
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: Material(
        color: on ? HS.brand : Colors.white,
        borderRadius: BorderRadius.circular(8),
        elevation: on ? 0 : 0,
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: () => _select(i),
          child: Container(
            height: 38,
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              boxShadow: on ? [BoxShadow(color: HS.brand.withOpacity(.4), blurRadius: 6, offset: const Offset(0, 2))] : const [BoxShadow(color: Color(0x0D000000), blurRadius: 2, offset: Offset(0, 1))],
            ),
            child: Text(_navItems[i].label, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: on ? Colors.white : HS.brandDark)),
          ),
        ),
      ),
    );
  }

  Widget _iconChip(IconData icon, VoidCallback onTap) => Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: onTap,
          child: Container(width: 38, height: 38, alignment: Alignment.center, decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), boxShadow: const [BoxShadow(color: Color(0x0D000000), blurRadius: 2, offset: Offset(0, 1))]), child: Icon(icon, size: 16, color: HS.brandDark)),
        ),
      );

  Widget _drawer(BuildContext c) => SafeArea(
        child: Column(children: [
          Container(height: 60, color: HS.headerBar, padding: const EdgeInsets.symmetric(horizontal: 18), alignment: Alignment.centerLeft, child: Row(children: [_logo(30), const SizedBox(width: 9), const Text('HolySpots', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500))])),
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
