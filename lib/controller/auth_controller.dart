import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:Portfolio_flutter/screen/accueil/home_screen.dart';
import 'package:Portfolio_flutter/screen/auth/interest_screen.dart';

import '../services/api_service.dart';
import '../services/notification_service.dart';

class AuthController extends GetxController {
  final ApiService apiService = ApiService();

  // Reactive variables
  var isAuthenticated = false.obs;
  var token = RxnString();
  final storage = const FlutterSecureStorage();

  Future<bool> checkInternetConnection() async {
    try {
      final response = await http.get(Uri.parse('https://www.Portfolio.net'));
      if (response.statusCode == 200) {
        return true;
      }
    } catch (e) {
      if (kDebugMode) {
        print('En attente de connection au serveur $e');
      }
    }
    return false;
  }

  // Signup method
  Future<void> signup(String username, String password, String confirmPassword,
      String email) async {
    bool isConnected = await checkInternetConnection();
    if (isConnected) {
      if (password != confirmPassword) {
        Get.snackbar(
          'Érreur mot de passe',
          'Raison : mot de passe different',
          backgroundColor: Colors.yellowAccent.withOpacity(0.2),
          colorText: Colors.black,
          icon: const Icon(Icons.warning_amber, color: Colors.black),
        );
      } else {
        try {
          await apiService.signup(username, password, email);
          Get.snackbar(
            'Success',
            'Inscription réussie pour $username',
            backgroundColor: Colors.green.withOpacity(0.2),
            colorText: Colors.black,
            icon: const Icon(Icons.check, color: Colors.black),
          );
          await apiService.login(username, password);

          Get.to(const InterestSelectionScreen());
        } catch (e) {
          // Affiche un snackbar d'erreur
          Get.snackbar(
            'Erreur de création de compte',
            'Raison : ${e.toString().replaceFirst('Exception: ', '')}',
            backgroundColor: Colors.red.withOpacity(0.2),
            colorText: Colors.black,
            icon: const Icon(Icons.cancel, color: Colors.black),
            isDismissible: true,
            dismissDirection: DismissDirection.horizontal,
          );
          if (kDebugMode) {
            print(e);
          }
        }
      }
    } else {
      Get.snackbar(
        'Internet error',
        'Salut $username, verifier votre connection',
        backgroundColor: Colors.green.withOpacity(0.2),
        colorText: Colors.black,
        icon: const Icon(Icons.signal_wifi_connected_no_internet_4),
      );
    }
  }

  // Login method
  Future<void> login(String username, String password) async {
    bool isConnected = await checkInternetConnection();
    if (username.isEmpty || password.isEmpty) {
      Get.snackbar(
        'Erreur de connection',
        'Raison : Veuillez remplir tous les champs',
        backgroundColor: Colors.yellowAccent.withOpacity(0.2),
        colorText: Colors.black,
        icon: const Icon(Icons.warning_amber, color: Colors.black),
      );
    } else if (isConnected) {
      try {
        final response = await apiService.login(username, password);
        token.value = response['jwt_token'];
        isAuthenticated.value = true;
        Get.off(const HomeScreen(), transition: Transition.zoom);
        NotificationService.showSuccessNotification(
          'Success',
          'Logged into Portfolio successfully',
        );
      } catch (e) {
        Get.snackbar('Erreur connection', 'Verifier les informations',
            backgroundColor: Colors.red.withOpacity(0.2),
            colorText: Colors.black,
            snackPosition: SnackPosition.TOP,
            icon: const Icon(Icons.cancel),
            isDismissible: true,
            dismissDirection: DismissDirection.horizontal,
            forwardAnimationCurve: Curves.easeInOutCirc);
        if (kDebugMode) {
          print(e);
        }
      }
    } else {
      Get.snackbar(
        'Internet error',
        'Salut $username, verifier votre connection',
        backgroundColor: Colors.green.withOpacity(0.2),
        colorText: Colors.black,
        icon: const Icon(Icons.signal_wifi_connected_no_internet_4),
      );
    }
  }

  // Logout method
  Future<void> logout() async {
    try {
      await apiService.logout();
      isAuthenticated.value = false;
      apiService.removeToken();
      NotificationService.showSuccessNotification(
        'See you soon!',
        'Logged of from Portfolio successfully',
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Logout failed: $e',
        snackPosition: SnackPosition.BOTTOM,
        isDismissible: true,
        dismissDirection: DismissDirection.horizontal,
      );
    }
  }
}
