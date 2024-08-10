import 'dart:io';

import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/screen/accueil/accueil_screen.dart';
import 'package:Portfolio_flutter/screen/accueil/home_screen.dart';
import 'package:Portfolio_flutter/screen/auth/interest_screen.dart';
import 'package:Portfolio_flutter/screen/auth/login_screen.dart';
import 'package:Portfolio_flutter/screen/auth/reset_pass_screen.dart';
import 'package:Portfolio_flutter/screen/auth/signup_screen.dart';
import 'package:Portfolio_flutter/screen/auth/verification_page.dart';
import 'package:Portfolio_flutter/screen/intro/splash_screen0.dart';
import 'package:Portfolio_flutter/screen/intro/splash_screen1.dart';
import 'package:Portfolio_flutter/screen/intro/splash_screen_authenticated.dart';
import 'package:Portfolio_flutter/screen/member/member_screen.dart';
import 'package:Portfolio_flutter/screen/plan/subsciption_screen.dart';
import 'package:Portfolio_flutter/screen/sortie/liste_sortie_screen.dart';
import 'package:Portfolio_flutter/screen/sortie/sortie_screen.dart';
import 'package:Portfolio_flutter/screen/user/edit_profile_screen.dart';
import 'package:Portfolio_flutter/screen/user/profil_page_screen.dart';
import 'package:Portfolio_flutter/services/api_service.dart';
import 'package:Portfolio_flutter/services/languageTranslations.dart';
import 'package:Portfolio_flutter/theme.dart';

import 'controller/connectivity_controller.dart';
import 'controller/theme_controller.dart';

void main() {
  HttpOverrides.global = MyHttpOverrides();
  AwesomeNotifications().initialize(
    null,
    [
      NotificationChannel(
        channelKey: 'basic_channel',
        channelName: 'Basic notifications',
        channelDescription: 'Notification channel for basic tests',
        defaultColor: Color(0xFF9D50DD),
        ledColor: Colors.white,
      ),
    ],
    debug: true,
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final ThemeController _themeController = Get.put(ThemeController());
  final ApiService apiService = Get.put(ApiService());
  final ConnectivityController connectivityController =
      Get.put(ConnectivityController());

  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String?>(
      future: apiService.getToken(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        } else if (snapshot.hasData && snapshot.data!.isNotEmpty) {
          if (kDebugMode) {
            print('Redirecting to members with Token: ${snapshot.data}');
          }
          return _buildApp('/splash_authenticated');
        } else {
          if (kDebugMode) {
            print(
                'Redirecting to home. Token is null or empty: ${snapshot.data}');
          }
          return _buildApp('/');
        }
      },
    );
  }

  Widget _buildApp(String initialRoute) {
    return Obx(() {
      final isDarkMode = _themeController.isDarkMode.value;

      // Set the System UI Overlay Style based on the current theme
      SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness:
            isDarkMode ? Brightness.light : Brightness.dark,
        statusBarBrightness: isDarkMode ? Brightness.dark : Brightness.light,
      ));

      return GetMaterialApp(
        translations: LanguageTranslations(),
        locale: Get.locale ?? Get.deviceLocale ?? const Locale('en', 'US'),
        fallbackLocale: const Locale('en', 'US'),
        debugShowCheckedModeBanner: false,
        theme: lightTheme,
        darkTheme: darkTheme,
        themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
        initialRoute: initialRoute,
        getPages: [
          GetPage(name: '/', page: () => const SplashScreen0()),
          GetPage(
              name: '/splash_authenticated',
              page: () => const SplashScreenAuthenticated()),
          GetPage(name: '/splash1', page: () => SplashScreen1()),
          GetPage(name: '/login', page: () => const LoginScreen()),
          GetPage(name: '/signup', page: () => SignupScreen()),
          GetPage(name: '/verify', page: () => const VerificationPage()),
          GetPage(name: '/resetPassword', page: () => const ResetPassScreen()),
          GetPage(
              name: '/interest', page: () => const InterestSelectionScreen()),
          GetPage(name: '/members', page: () => MembeScreen()),
          GetPage(name: '/sortie', page: () => const SortieScreen()),
          GetPage(name: '/accueil', page: () => const AccueilScreen()),
          GetPage(name: '/liste_sortie', page: () => const EventScreen()),
          GetPage(name: '/home', page: () => const HomeScreen()),
          GetPage(name: '/edit_profil', page: () => const EditProfileScreen()),
          GetPage(name: '/profil', page: () => const ProfilPageScreen()),
          GetPage(
              name: '/subscriptions', page: () => const SubscriptionScreen()),
        ],
        initialBinding: BindingsBuilder(() {
          Get.put(ApiService());
        }),
      );
    });
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
