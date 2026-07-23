import 'package:flutter/material.dart';

/// Visual tokens — HolySpots Design System.
/// V3 = original admin style (cloud canvas, top pill navigation bar, white cards).
class HS {
  static const bool original = true; // V3 original admin look

  static const brand = Color(0xFF00ACE9);
  static const brandDark = Color(0xFF0091C4);
  static const coral = Color(0xFFFE835D);

  static const canvas = Color(0xFFDCE8EC);
  static const headerBar = Color(0xFFCFE0E7);
  static const card = Colors.white;

  static const textDark = Color(0xFF1C2B33);
  static const muted = Color(0xFF5C6B73);
  static const faint = Color(0xFF90A4AC);

  static const border = Color(0xFFCDDBE2);
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
