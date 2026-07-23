import 'package:flutter/material.dart';
import 'theme.dart';

class Col {
  final int flex;
  final Widget child;
  const Col(this.flex, this.child);
}

/// One adaptive table/list row with a leading drag handle.
/// Wide (tablet/desktop): columns laid out with flex.
/// Phone: title + subtitle stack with trailing actions.
Widget adminRow({
  required Key key,
  required int index,
  required bool wide,
  required List<Col> cols,
  required List<Widget> actions,
  required String phoneTitle,
  String? phoneSubtitle,
  Widget? phoneLeading,
  Color? bg,
  double height = 56,
  double indent = 0,
}) {
  Widget handle = ReorderableDragStartListener(
    index: index,
    child: const MouseRegion(
      cursor: SystemMouseCursors.grab,
      child: SizedBox(width: 28, child: Icon(Icons.drag_indicator, size: 18, color: Color(0xFFA9BCC4))),
    ),
  );

  if (wide) {
    return KeyedSubtree(
      key: key,
      child: Container(
      height: height,
      decoration: BoxDecoration(color: bg, border: const Border(bottom: BorderSide(color: HS.divider))),
      padding: EdgeInsets.only(right: 12, left: indent),
      child: Row(children: [
        handle,
        ...cols.map((c) => Expanded(flex: c.flex, child: Padding(padding: const EdgeInsets.only(right: 10), child: c.child))),
        Row(mainAxisSize: MainAxisSize.min, children: _spaced(actions)),
      ]),
    ),
    );
  }

  return KeyedSubtree(
    key: key,
    child: Container(
    decoration: BoxDecoration(color: bg, border: const Border(bottom: BorderSide(color: HS.divider))),
    padding: EdgeInsets.fromLTRB(indent, 10, 10, 10),
    child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
      handle,
      if (phoneLeading != null) ...[phoneLeading, const SizedBox(width: 10)],
      Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
          Text(phoneTitle, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
          if (phoneSubtitle != null && phoneSubtitle.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 2),
              child: Text(phoneSubtitle, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, color: HS.muted)),
            ),
        ]),
      ),
      const SizedBox(width: 8),
      Wrap(spacing: 6, children: actions),
    ]),
  ),
  );
}

List<Widget> _spaced(List<Widget> ws) {
  final out = <Widget>[];
  for (var i = 0; i < ws.length; i++) {
    if (i > 0) out.add(const SizedBox(width: 6));
    out.add(ws[i]);
  }
  return out;
}

/// Column header row (wide only).
Widget columnHeader(List<Col> cols) => Container(
      height: 44,
      padding: const EdgeInsets.only(left: 28, right: 12),
      decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFFDBE7EC)))),
      child: Row(
        children: cols
            .map((c) => Expanded(
                  flex: c.flex,
                  child: DefaultTextStyle(
                    style: const TextStyle(fontSize: 12, letterSpacing: .4, color: HS.muted, fontWeight: FontWeight.w500),
                    child: c.child,
                  ),
                ))
            .toList(),
      ),
    );

Widget muted(String s, {double size = 14}) => Text(s, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: size, color: HS.muted));
Widget strong(String s) => Text(s, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500));
