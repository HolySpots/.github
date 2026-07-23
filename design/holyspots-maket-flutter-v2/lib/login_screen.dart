import 'package:flutter/material.dart';
import 'theme.dart';
import 'responsive.dart';

class LoginScreen extends StatelessWidget {
  final VoidCallback onLogin;
  const LoginScreen({super.key, required this.onLogin});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: HS.canvas,
      body: Column(children: [
        Container(
          height: 60,
          padding: const EdgeInsets.symmetric(horizontal: 18),
          color: HS.original ? const Color(0xFFCFE0E7) : Colors.white,
          child: Row(children: [
            _logo(30),
            const SizedBox(width: 9),
            const Text('HolySpots', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
            const Spacer(),
            const Text('Панель администратора', style: TextStyle(fontSize: 13, color: Color(0xFF41616E))),
          ]),
        ),
        Expanded(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Container(
                width: 380,
                padding: const EdgeInsets.fromLTRB(34, 34, 34, 28),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), boxShadow: const [BoxShadow(color: Color(0x281F3A44), blurRadius: 34, offset: Offset(0, 10))]),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  _logo(52, radius: 14),
                  const SizedBox(height: 12),
                  const Text('Вход в админку', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w500)),
                  const SizedBox(height: 20),
                  _label('Логин'),
                  const _Input('admin'),
                  const SizedBox(height: 16),
                  _label('Пароль'),
                  const _Input('••••••••', muted: true),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity, height: 50,
                    child: FilledButton.icon(
                      style: FilledButton.styleFrom(backgroundColor: HS.brand, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9))),
                      onPressed: onLogin,
                      icon: const Icon(Icons.login, size: 18),
                      label: const Text('Войти', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
                    ),
                  ),
                ]),
              ),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _label(String s) => Align(alignment: Alignment.centerLeft, child: Padding(padding: const EdgeInsets.only(bottom: 6), child: Text(s, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Color(0xFF41616E)))));

  Widget _logo(double size, {double radius = 8}) => ClipRRect(
        borderRadius: BorderRadius.circular(radius),
        child: Image.asset('assets/holyspots_app_icon.png', width: size, height: size, fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(width: size, height: size, color: HS.brand, alignment: Alignment.center, child: Text('H', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: size * .5)))),
      );
}

class _Input extends StatelessWidget {
  final String text;
  final bool muted;
  const _Input(this.text, {this.muted = false});
  @override
  Widget build(BuildContext context) => Container(
        width: double.infinity, height: 48,
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(border: Border.all(color: HS.border), borderRadius: BorderRadius.circular(9)),
        child: Text(text, style: TextStyle(fontSize: 15, color: muted ? HS.muted : HS.textDark)),
      );
}
