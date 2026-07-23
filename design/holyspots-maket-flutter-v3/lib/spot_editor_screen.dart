import 'package:flutter/material.dart';
import 'theme.dart';
import 'responsive.dart';
import 'common.dart';

class SpotEditorScreen extends StatefulWidget {
  final VoidCallback onClose;
  const SpotEditorScreen({super.key, required this.onClose});
  @override
  State<SpotEditorScreen> createState() => _SpotEditorScreenState();
}

class _SpotEditorScreenState extends State<SpotEditorScreen> {
  List<String> cities = ['Говардхан', 'Вриндаван'];
  final days = {'Пн': true, 'Вт': true, 'Ср': true, 'Чт': true, 'Пт': true, 'Сб': true, 'Вс': false};
  String lang = 'RU';

  @override
  Widget build(BuildContext context) {
    final desktop = isDesktop(context);
    return Padding(
      padding: pagePad(context),
      child: Container(
        decoration: BoxDecoration(color: HS.card, borderRadius: BorderRadius.circular(12), boxShadow: const [BoxShadow(color: Color(0x141F3A44), blurRadius: 3, offset: Offset(0, 1))]),
        clipBehavior: Clip.antiAlias,
        child: Column(children: [
          _header(context),
          const Divider(height: 1, color: HS.border),
          Expanded(
            child: desktop
                ? Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                    Expanded(child: _form(context)),
                    Container(width: 420, decoration: const BoxDecoration(border: Border(left: BorderSide(color: HS.border))), child: _mapPane()),
                  ])
                : SingleChildScrollView(padding: const EdgeInsets.all(18), child: Column(children: [_mapCard(height: 180), const SizedBox(height: 18), ..._fields(context)])),
          ),
        ]),
      ),
    );
  }

  Widget _header(BuildContext c) {
    Widget langSeg(String l) {
      final on = lang == l;
      return InkWell(onTap: () => setState(() => lang = l), child: Container(padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8), color: on ? HS.brand : Colors.white, child: Text(l, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: on ? Colors.white : HS.muted))));
    }

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 12, 16, 12),
      child: Row(children: [
        IconButton(onPressed: widget.onClose, icon: const Icon(Icons.arrow_back, size: 20), color: HS.muted),
        const Text('Споты › ', style: TextStyle(fontSize: 13, color: HS.muted)),
        const Flexible(child: Text('Даан-Гхати Мандир', overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500))),
        const Spacer(),
        if (!isPhone(c)) ...[
          ClipRRect(borderRadius: BorderRadius.circular(8), child: Container(decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(8)), child: Row(mainAxisSize: MainAxisSize.min, children: [langSeg('RU'), const VerticalDivider(width: 1), langSeg('EN'), const VerticalDivider(width: 1), langSeg('HI')]))),
          const SizedBox(width: 10),
          OutlinedButton(onPressed: widget.onClose, style: OutlinedButton.styleFrom(foregroundColor: HS.coral, side: const BorderSide(color: HS.coralBorder), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9))), child: const Text('Удалить')),
          const SizedBox(width: 10),
        ],
        primaryButton('Сохранить', icon: Icons.check, solid: true, onTap: widget.onClose),
      ]),
    );
  }

  Widget _form(BuildContext c) => SingleChildScrollView(padding: const EdgeInsets.all(20), child: Column(children: _fields(c)));

  List<Widget> _fields(BuildContext c) => [
        _field('Название (RU)', const _FakeInput('Даан-Гхати Мандир')),
        const SizedBox(height: 16),
        _field('Информация (RU)', const _FakeInput('Один из главных храмов Говардхана на пути парикрамы. Паломники начинают обход холма отсюда…', minHeight: 88)),
        const SizedBox(height: 16),
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(child: _field('Города', _cityChips())),
          const SizedBox(width: 16),
          Expanded(child: _field('Тип объекта', const _FakeInput('Храм', dropdown: true))),
        ]),
        const SizedBox(height: 16),
        _field('Время работы', _workTime()),
        const SizedBox(height: 16),
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(child: _field('Связанные маршруты', _checkList(['Говардхан-парикрама', 'Павильоны Ангкор-Вата'], 0))),
          const SizedBox(width: 16),
          Expanded(child: _field('Связанные события', _checkList(['Гуру Пурнима', 'Курс Випассаны'], 0))),
        ]),
        const SizedBox(height: 16),
        _field('iBeacon — маяк для аудиогида', Row(children: const [
          Expanded(flex: 2, child: _MiniField('UUID', 'f7826da6-4fa2-4e98-8024-bc5b71e0893e')),
          SizedBox(width: 10),
          Expanded(child: _MiniField('Major', '100')),
          SizedBox(width: 10),
          Expanded(child: _MiniField('Minor', '17')),
        ])),
        const SizedBox(height: 16),
        _field('Видео (2)', _videoList()),
        const SizedBox(height: 16),
        _field('Изображения (3)', _images()),
      ];

  Widget _field(String label, Widget child) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Padding(padding: const EdgeInsets.only(bottom: 6), child: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500))),
        child,
      ]);

  Widget _cityChips() => Container(
        constraints: const BoxConstraints(minHeight: 44),
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Wrap(spacing: 6, runSpacing: 6, crossAxisAlignment: WrapCrossAlignment.center, children: [
          ...cities.map((name) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 5),
                decoration: BoxDecoration(color: HS.blueChipBg, borderRadius: BorderRadius.circular(999)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text(name, style: const TextStyle(fontSize: 13, color: HS.brandDark, fontWeight: FontWeight.w500)),
                  const SizedBox(width: 6),
                  InkWell(onTap: () => setState(() => cities.remove(name)), child: const Icon(Icons.close, size: 14, color: Color(0xFF60AAE5))),
                ]),
              )),
          InkWell(onTap: () => setState(() => cities.add('Матхура')), child: const Padding(padding: EdgeInsets.all(4), child: Text('+ Город ▾', style: TextStyle(color: HS.faint)))),
        ]),
      );

  Widget _workTime() => Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Wrap(spacing: 6, runSpacing: 6, crossAxisAlignment: WrapCrossAlignment.center, children: [
            ...days.entries.map((e) => InkWell(
                  onTap: () => setState(() => days[e.key] = !e.value),
                  child: Container(
                    width: 36, height: 36, alignment: Alignment.center,
                    decoration: BoxDecoration(color: e.value ? HS.brand : Colors.white, border: e.value ? null : Border.all(color: HS.border), borderRadius: BorderRadius.circular(8)),
                    child: Text(e.key, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: e.value ? Colors.white : HS.faint)),
                  ),
                )),
          ]),
          const SizedBox(height: 14),
          Wrap(spacing: 10, runSpacing: 10, crossAxisAlignment: WrapCrossAlignment.center, children: const [
            _FakeInput('05:00', icon: Icons.schedule, width: 110),
            Text('—', style: TextStyle(color: HS.faint)),
            _FakeInput('21:30', width: 90),
            _FakeInput('Азия/Калькутта (UTC+5:30)', dropdown: true, width: 240),
          ]),
        ]),
      );

  Widget _checkList(List<String> items, int checkedIdx) => Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Column(children: [
          for (var i = 0; i < items.length; i++)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
              decoration: BoxDecoration(color: i == checkedIdx ? HS.blueChipBg : null, borderRadius: BorderRadius.circular(7)),
              child: Row(children: [
                Container(width: 16, height: 16, alignment: Alignment.center, decoration: BoxDecoration(color: i == checkedIdx ? HS.brand : null, border: i == checkedIdx ? null : Border.all(color: const Color(0xFFB7C6CD), width: 1.5), borderRadius: BorderRadius.circular(4)), child: i == checkedIdx ? const Icon(Icons.check, size: 11, color: Colors.white) : null),
                const SizedBox(width: 10),
                Expanded(child: Text(items[i], style: const TextStyle(fontSize: 14))),
              ]),
            ),
        ]),
      );

  Widget _videoList() => Container(
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Column(children: [
          _videoRow('arati_morning.mp4', 'превью: photo_arati.jpg'),
          const Divider(height: 1, color: HS.divider),
          _videoRow('parikrama_path.mp4', 'превью: photo_path.jpg'),
          const Padding(padding: EdgeInsets.all(12), child: Align(alignment: Alignment.centerLeft, child: Text('+ Добавить видео', style: TextStyle(color: HS.brandDark)))),
        ]),
      );

  Widget _videoRow(String name, String sub) => Padding(
        padding: const EdgeInsets.all(12),
        child: Row(children: [
          Container(width: 56, height: 36, alignment: Alignment.center, decoration: BoxDecoration(color: const Color(0xFFE3EDF1), borderRadius: BorderRadius.circular(6)), child: const Icon(Icons.play_arrow, color: HS.faint, size: 18)),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)), Text(sub, style: const TextStyle(fontSize: 12, color: HS.faint))])),
          const Icon(Icons.close, size: 16, color: HS.faint),
        ]),
      );

  Widget _images() => Wrap(spacing: 10, runSpacing: 10, children: [
        for (var i = 0; i < 3; i++) Container(width: 84, height: 84, decoration: BoxDecoration(color: const Color(0xFFE3EDF1), borderRadius: BorderRadius.circular(9))),
        Container(width: 84, height: 84, decoration: BoxDecoration(border: Border.all(color: const Color(0xFFB7C6CD), width: 1.5, style: BorderStyle.solid), borderRadius: BorderRadius.circular(9)), child: const Icon(Icons.add, color: HS.faint)),
      ]);

  Widget _mapPane() => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Padding(padding: const EdgeInsets.fromLTRB(20, 20, 20, 12), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
          Text('Координаты', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
          SizedBox(height: 10),
          Row(children: [Expanded(child: _MiniField('Широта', '27.496412')), SizedBox(width: 10), Expanded(child: _MiniField('Долгота', '77.463105'))]),
          SizedBox(height: 8),
          Text('Кликните по карте, чтобы переместить точку', style: TextStyle(fontSize: 12, color: HS.faint)),
        ])),
        Expanded(child: Padding(padding: const EdgeInsets.fromLTRB(20, 0, 20, 20), child: _mapCard())),
      ]);

  Widget _mapCard({double? height}) => Container(
        height: height,
        decoration: BoxDecoration(color: const Color(0xFFEEF3F5), border: Border.all(color: const Color(0xFFDBE7EC)), borderRadius: BorderRadius.circular(10)),
        clipBehavior: Clip.antiAlias,
        child: CustomPaint(painter: _MapPainter(), child: const SizedBox.expand()),
      );
}

class _FakeInput extends StatelessWidget {
  final String text;
  final double minHeight;
  final bool dropdown;
  final IconData? icon;
  final double? width;
  const _FakeInput(this.text, {this.minHeight = 44, this.dropdown = false, this.icon, this.width});
  @override
  Widget build(BuildContext context) => Container(
        width: width,
        constraints: BoxConstraints(minHeight: minHeight),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 11),
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          if (icon != null) ...[Icon(icon, size: 14, color: HS.faint), const SizedBox(width: 8)],
          Flexible(child: Text(text, style: const TextStyle(fontSize: 14, height: 1.5, color: HS.textDark))),
          if (dropdown) ...[const SizedBox(width: 8), const Icon(Icons.expand_more, size: 16, color: HS.faint)],
        ]),
      );
}

class _MiniField extends StatelessWidget {
  final String label, value;
  const _MiniField(this.label, this.value);
  @override
  Widget build(BuildContext context) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: const TextStyle(fontSize: 11, color: HS.faint)),
        const SizedBox(height: 4),
        Container(height: 40, alignment: Alignment.centerLeft, padding: const EdgeInsets.symmetric(horizontal: 12), decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)), child: Text(value, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 13))),
      ]);
}

class _MapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final grid = Paint()..color = const Color(0xFFD5E2E8)..strokeWidth = 1;
    for (double y = size.height / 4; y < size.height; y += size.height / 4) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), grid);
    }
    for (double x = size.width / 4; x < size.width; x += size.width / 4) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), grid);
    }
    final path = Path()
      ..moveTo(size.width * .12, size.height * .82)
      ..cubicTo(size.width * .34, size.height * .6, size.width * .45, size.height * .55, size.width * .52, size.height * .48)
      ..cubicTo(size.width * .68, size.height * .32, size.width * .8, size.height * .2, size.width * .88, size.height * .16);
    canvas.drawPath(path, Paint()..color = const Color(0xFFA9BCC4)..strokeWidth = 3..style = PaintingStyle.stroke);
    final c = Offset(size.width * .52, size.height * .48);
    canvas.drawCircle(c, 10, Paint()..color = HS.brand);
    canvas.drawCircle(c, 10, Paint()..color = Colors.white..strokeWidth = 3..style = PaintingStyle.stroke);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
