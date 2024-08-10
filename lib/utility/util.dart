import 'dart:math';

import 'package:flag/flag.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_zoom_drawer/flutter_zoom_drawer.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

bool isTablet(BuildContext context) {
  final mediaQuery = MediaQuery.of(context);
  final size = mediaQuery.size;
  final diagonal = sqrt(size.width * size.width + size.height * size.height);
  final isTablet = diagonal > 1100.0;
  return isTablet;
}

ThemeData getTheme(BuildContext context) {
  final theme = Theme.of(context);
  return theme;
}

double getScreenWidth(BuildContext context) {
  return MediaQuery.of(context).size.width;
}

double getScreenHeight(BuildContext context) {
  return MediaQuery.of(context).size.height;
}

double getContainerWidth(BuildContext context) {
  return getScreenWidth(context) - 50;
}

double getContainerHeight(BuildContext context) {
  return getScreenHeight(context) - 50;
}

double getContainerHeightWithAppBar(BuildContext context) {
  return getScreenHeight(context) - 100;
}

double getContainerHeightWithAppBarAndFooter(BuildContext context) {
  return getScreenHeight(context) - 150;
}

double getContainerHeightWithAppBarAndFooterAndTabBar(BuildContext context) {
  return getScreenHeight(context) - 200;
}

double getContainerHeightWithAppBarAndTabBar(BuildContext context) {
  return getScreenHeight(context) - 150;
}

double getContainerHeightWithFooter(BuildContext context) {
  return getScreenHeight(context) - 100;
}

double getContainerHeightWithTabBar(BuildContext context) {
  return getScreenHeight(context) - 100;
}

double getContainerHeightWithTabBarAndFooter(BuildContext context) {
  return getScreenHeight(context) - 150;
}

double getContainerHeightWithTabBarAndFooterAndAppBar(BuildContext context) {
  return getScreenHeight(context) - 200;
}

double getContainerHeightWithTabBarAndAppBar(BuildContext context) {
  return getScreenHeight(context) - 150;
}

void getHaptics() async {
  HapticFeedback.lightImpact();
}

void openDrawer(BuildContext context) {
  if (ZoomDrawer.of(context)!.isOpen()) {
    ZoomDrawer.of(context)!.close();
  } else {
    ZoomDrawer.of(context)!.open();
  }
}

void closeDrawer(BuildContext context) {
  ZoomDrawer.of(context)!.close();
}

void showAlertErrorWidget(BuildContext context, String title, String content) {
  Get.dialog(
    AlertDialog(
      backgroundColor: Theme.of(context).cardColor,
      title: Text(title),
      icon: Icon(
        Icons.error,
        size: 100,
        color: Colors.red.shade500,
      ),
      content: Text(
        content,
        textAlign: TextAlign.center,
      ),
      actions: [
        TextButton(
          onPressed: () => Get.back(),
          child: Container(
            padding:
                const EdgeInsets.only(left: 20, right: 20, top: 10, bottom: 10),
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(
                  Radius.circular(20),
                ),
                color: Colors.red.shade500),
            child: const Text('Okay'),
          ),
        ),
      ],
    ),
  );
}

void showAlertSuccessWidget(
    BuildContext context, String title, String content) {
  Get.dialog(
    AlertDialog(
      backgroundColor: Theme.of(context).cardColor,
      title: Text(title),
      icon: Icon(
        Icons.check,
        size: 100,
        color: Colors.green.shade500,
      ),
      content: Text(
        content,
        textAlign: TextAlign.center,
      ),
      actions: [
        TextButton(
          onPressed: () => Get.back(),
          child: Container(
            padding:
                const EdgeInsets.only(left: 20, right: 20, top: 10, bottom: 10),
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(
                  Radius.circular(20),
                ),
                color: Colors.green.shade500),
            child: const Text('Okay'),
          ),
        ),
      ],
    ),
  );
}

void setLanguage(Locale locale) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString('locale', locale.languageCode);
  Get.updateLocale(locale);
}

class LanguageWidget extends StatelessWidget {
  const LanguageWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      onChanged: (String? newValue) {
        if (newValue != null) {
          Locale newLocale;

          switch (newValue) {
            case 'English':
              newLocale = const Locale('en', 'US');
              break;
            case 'Français':
              newLocale = const Locale('fr', 'FR');
              break;
            default:
              return;
          }

          // Check if the new locale is different from the current locale
          if (Get.locale != newLocale) {
            setLanguage(newLocale);
            Get.updateLocale(newLocale);
          }
        }
      },
      items: const <DropdownMenuItem<String>>[
        DropdownMenuItem(
          value: 'English',
          child: Row(
            children: [
              Flag.fromString(
                "US",
                width: 20,
                height: 20,
              ),
              SizedBox(
                width: 8,
              ),
              Text('English'),
            ],
          ),
        ),
        DropdownMenuItem(
          value: 'Français',
          child: Row(
            children: [
              Flag.fromString(
                "FR",
                width: 20,
                height: 20,
              ),
              SizedBox(
                width: 8,
              ),
              Text('Français'),
            ],
          ),
        ),
      ],
      icon: const Icon(Icons.arrow_drop_down),
      hint: Text('language'.tr),
      isExpanded: false,
    );
  }
}

void showLanguageDialog(BuildContext context) {
  Get.dialog(
    AlertDialog(
      alignment: isTablet(context) ? Alignment.topRight : Alignment.center,
      title: Text('choose_language'.tr),
      icon: Icon(
        Icons.language,
        size: 30,
        color: getTheme(context).hintColor,
      ),
      content: SingleChildScrollView(
        child: DropdownButton<String>(
          onChanged: (String? newValue) {
            if (newValue != null) {
              Locale newLocale;

              switch (newValue) {
                case 'English':
                  newLocale = const Locale('en', 'US');
                  break;
                case 'Français':
                  newLocale = const Locale('fr', 'FR');
                  break;
                default:
                  return;
              }

              // Check if the new locale is different from the current locale
              if (Get.locale != newLocale) {
                // Update the locale
                Get.updateLocale(newLocale);

                // Optional: Persist the locale change if needed
                // await saveLocaleToStorage(newLocale);
              }
            }
          },
          items: const <DropdownMenuItem<String>>[
            DropdownMenuItem(
              value: 'English',
              child: Row(
                children: [
                  Flag.fromString(
                    "US",
                    width: 20,
                    height: 20,
                  ),
                  SizedBox(width: 8),
                  Text('English'),
                ],
              ),
            ),
            DropdownMenuItem(
              value: 'Français',
              child: Row(
                children: [
                  Flag.fromString(
                    "FR",
                    width: 20,
                    height: 20,
                  ),
                  SizedBox(width: 8),
                  Text('Français'),
                ],
              ),
            ),
          ],
          icon: const Icon(Icons.arrow_drop_down),
          hint: Text('language'.tr),
          isExpanded: true,
          borderRadius: BorderRadius.all(Radius.circular(20)),
          elevation: 0,
          dropdownColor: getTheme(context).primaryColor,
          enableFeedback: true,
        ),
      ),
    ),
  );
}
