import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/screen/intro/splash_screen1.dart';

import '../../services/api_service.dart';
import '../accueil/home_screen.dart';

class SplashScreenAuthenticated extends StatefulWidget {
  const SplashScreenAuthenticated({super.key});

  @override
  SplashScreenAuthenticatedState createState() =>
      SplashScreenAuthenticatedState();
}

class SplashScreenAuthenticatedState extends State<SplashScreenAuthenticated>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final ApiService apiService = ApiService();
  late Timer _timer;
  bool _isConnected = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();
    // Start periodic connectivity checks
    _startPeriodicConnectivityCheck();
  }

  @override
  void dispose() {
    _controller.dispose();
    _timer.cancel();
    super.dispose();
  }

  void _startPeriodicConnectivityCheck() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) async {
      var connectivityResult = await Connectivity().checkConnectivity();
      setState(() {
        _isConnected = connectivityResult != ConnectivityResult.none;
      });

      if (_isConnected) {
        _timer.cancel();
        _preloadData();
      }
    });
  }

  Future<void> _preloadData() async {
    Get.offAll(() => const HomeScreen());
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Stack(
          children: [
            Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/splash.png'),
                  fit: BoxFit.fitWidth,
                ),
              ),
            ),
            Container(
              padding: EdgeInsets.only(top: screenHeight / 4),
              alignment: Alignment.topCenter,
              child: const Text(
                "Portfolio",
                style: TextStyle(
                    fontSize: 70.0,
                    color: Colors.black,
                    fontWeight: FontWeight.bold),
              ),
            ),
            Container(
              padding: EdgeInsets.only(top: screenHeight / 3),
              alignment: Alignment.topCenter,
              child: Text(
                "mime".tr,
                style: TextStyle(
                    fontSize: 20.0,
                    color: Colors.black.withOpacity(0.3),
                    fontWeight: FontWeight.bold),
              ),
            ),
            Align(
              alignment: Alignment.center,
              child: RotationTransition(
                  turns: _controller,
                  child: Image.asset(
                    'assets/images/img_1.png',
                    width: screenWidth / 2,
                    height: screenHeight / 5,
                  )),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 400,
                padding: const EdgeInsets.only(bottom: 50),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Show different text based on connection status
                    if (!_isConnected) ...[
                      const SizedBox(height: 20),
                      // Add some space between animation and text
                      Text(
                        'no_internet'.tr,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.red,
                          fontSize: 15,
                        ),
                      ),
                    ] else ...[
                      const SizedBox(height: 20),
                      // Add some space between animation and text
                      GestureDetector(
                        child: Text(
                          'loading'.tr,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                          ),
                        ),
                        onLongPress: () {
                          Get.off(SplashScreen1());
                        },
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
