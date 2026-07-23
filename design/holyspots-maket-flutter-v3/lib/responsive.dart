import 'package:flutter/widgets.dart';

enum FormFactor { phone, tablet, desktop }

FormFactor formFactorOf(BuildContext c) {
  final w = MediaQuery.of(c).size.width;
  if (w < 600) return FormFactor.phone;
  if (w < 1100) return FormFactor.tablet;
  return FormFactor.desktop;
}

bool isPhone(BuildContext c) => formFactorOf(c) == FormFactor.phone;
bool isTablet(BuildContext c) => formFactorOf(c) == FormFactor.tablet;
bool isDesktop(BuildContext c) => formFactorOf(c) == FormFactor.desktop;

/// Wide = tablet or desktop (uses table rows + persistent nav).
bool isWide(BuildContext c) => formFactorOf(c) != FormFactor.phone;
