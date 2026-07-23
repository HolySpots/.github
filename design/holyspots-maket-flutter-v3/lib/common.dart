import 'package:flutter/material.dart';
import 'theme.dart';
import 'responsive.dart';

Widget hsTag(String text, {bool blue = false}) => Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(
        color: blue ? HS.blueChipBg : HS.chipBg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(text,
          style: TextStyle(fontSize: 12, color: blue ? HS.brandDark : HS.muted, fontWeight: FontWeight.w500)),
    );

/// Small action button used in table rows: Edit (blue), Delete (coral outline).
Widget rowAction(String label, {bool coral = false, bool filled = false, VoidCallback? onTap}) {
  final child = Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
    decoration: BoxDecoration(
      color: filled ? HS.brand : (coral ? Colors.transparent : HS.blueChipBg),
      border: coral ? Border.all(color: HS.coralBorder) : null,
      borderRadius: BorderRadius.circular(7),
    ),
    child: Text(label,
        style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: filled ? Colors.white : (coral ? HS.coral : HS.brandDark))),
  );
  return InkWell(onTap: onTap, borderRadius: BorderRadius.circular(7), child: child);
}

/// Primary pill button (Add / Save).
Widget primaryButton(String label, {IconData icon = Icons.add, VoidCallback? onTap, bool solid = false}) {
  return InkWell(
    onTap: onTap,
    borderRadius: BorderRadius.circular(9),
    child: Container(
      height: 44,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: solid ? HS.brand : HS.blueChipBg,
        border: solid ? null : Border.all(color: const Color(0xFFCFE6F5)),
        borderRadius: BorderRadius.circular(9),
        boxShadow: solid ? [BoxShadow(color: HS.brand.withOpacity(.32), blurRadius: 10, offset: const Offset(0, 3))] : null,
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(icon, size: 17, color: solid ? Colors.white : HS.brandDark),
        const SizedBox(width: 7),
        Text(label, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: solid ? Colors.white : HS.brandDark)),
      ]),
    ),
  );
}

Widget dragHandle() => const Icon(Icons.drag_indicator, size: 18, color: Color(0xFFA9BCC4));

Widget filterChip(String label) => Container(
      height: 40,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: HS.card,
        border: Border.all(color: HS.border),
        borderRadius: BorderRadius.circular(9),
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Text(label, style: const TextStyle(fontSize: 13, color: HS.muted)),
        const SizedBox(width: 4),
        const Icon(Icons.expand_more, size: 16, color: HS.faint),
      ]),
    );

/// White content card with a title row and a count badge.
class PanelCard extends StatelessWidget {
  final String title;
  final String? count;
  final List<Widget> headerActions;
  final Widget child;
  final String? footer;
  const PanelCard({super.key, required this.title, this.count, this.headerActions = const [], required this.child, this.footer});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: HS.card,
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [BoxShadow(color: Color(0x141F3A44), blurRadius: 3, offset: Offset(0, 1))],
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 14, 16, 14),
          child: Row(children: [
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w500)),
            if (count != null) ...[const SizedBox(width: 10), hsTag(count!)],
            const Spacer(),
            ...headerActions,
          ]),
        ),
        const Divider(height: 1, color: HS.border),
        Expanded(child: child),
        if (footer != null) ...[
          const Divider(height: 1, color: HS.border),
          Container(
            height: 48,
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Text(footer!, style: const TextStyle(fontSize: 13, color: HS.muted)),
          ),
        ],
      ]),
    );
  }
}

/// Reorderable list — the manual "app order" (drag handle ⋮⋮) used everywhere.
class ReorderList extends StatelessWidget {
  final int itemCount;
  final Widget Function(BuildContext, int) rowBuilder;
  final void Function(int, int) onReorder;
  const ReorderList({super.key, required this.itemCount, required this.rowBuilder, required this.onReorder});

  @override
  Widget build(BuildContext context) {
    return ReorderableListView.builder(
      buildDefaultDragHandles: false,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      itemCount: itemCount,
      onReorder: onReorder,
      proxyDecorator: (child, index, anim) => Material(
        color: Colors.white,
        elevation: 6,
        borderRadius: BorderRadius.circular(8),
        child: child,
      ),
      itemBuilder: rowBuilder,
    );
  }
}

/// A drag handle bound to a reorderable index.
Widget reorderHandle(int index) => ReorderableDragStartListener(
      index: index,
      child: const MouseRegion(
        cursor: SystemMouseCursors.grab,
        child: Padding(padding: EdgeInsets.only(right: 4), child: Icon(Icons.drag_indicator, size: 18, color: Color(0xFFA9BCC4))),
      ),
    );

/// Layout helper: page padding differs a little between phone and wide.
EdgeInsets pagePad(BuildContext c) => isPhone(c) ? const EdgeInsets.all(12) : const EdgeInsets.all(20);
