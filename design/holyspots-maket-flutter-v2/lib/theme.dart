import 'package:flutter/material.dart';

/// Visual tokens — HolySpots Design System.
/// V2 = modern minimalist (flat white surfaces, left navigation rail).
class HS {
  static const bool original = false; // V2 minimalist

  static const brand = Color(0xFF00ACE9);
  static const brandDark = Color(0xFF0091C4);
  static const coral = Color(0xFFFE835D);

  static const canvas = Color(0xFFF4F7F9);
  static const headerBar = Colors.white;
  static const card = Colors.white;

  static const textDark = Color(0xFF1C2B33);
  static const muted = Color(0xFF5C6B73);
  static const faint = Color(0xFF90A4AC);

  static const border = Color(0xFFE3EDF1);
  static const divider = Color(0xFFEEF3F5);
  static const chipBg = Color(0xFFEEF3F5);
  static const blueChipBg = Color(0xFFEEF8FD);
  static const coralBorder = Color(0xFFF0C9BB);
  static const coralBg = Color(0xFFFDECE5);

  static const radius = 10.0;
}

ThemeData buildTheme() {
  return ThemeData(
    useMaterial3: true,
    fontFamily: 'Roboto',
    scaffoldBackgroundColor: HS.canvas,
    colorScheme: ColorScheme.fromSeed(
      seedColor: HS.brand,
      primary: HS.brand,
      surface: HS.card,
    ),
    dividerColor: HS.divider,
    textTheme: const TextTheme().apply(bodyColor: HS.textDark, displayColor: HS.textDark),
  );
}
