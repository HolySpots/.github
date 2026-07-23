import 'package:flutter/material.dart';
import 'theme.dart';
import 'login_screen.dart';
import 'app_shell.dart';

void main() => runApp(const HolySpotsAdminApp());

class HolySpotsAdminApp extends StatelessWidget {
  const HolySpotsAdminApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HolySpots Admin — v2',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(),
      home: const _Root(),
    );
  }
}

class _Root extends StatefulWidget {
  const _Root();
  @override
  State<_Root> createState() => _RootState();
}

class _RootState extends State<_Root> {
  bool loggedIn = false;
  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 200),
      child: loggedIn
          ? AppShell(key: const ValueKey('shell'), onLogout: () => setState(() => loggedIn = false))
          : LoginScreen(key: const ValueKey('login'), onLogin: () => setState(() => loggedIn = true)),
    );
  }
}
