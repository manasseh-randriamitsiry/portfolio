import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_zoom_drawer/flutter_zoom_drawer.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/screen/accueil/accueil_screen.dart';
import 'package:Portfolio_flutter/screen/lieu/lieu_page.dart';
import 'package:Portfolio_flutter/screen/member/member_screen.dart';
import 'package:Portfolio_flutter/screen/sortie/liste_sortie_screen.dart';
import 'package:Portfolio_flutter/screen/user/profil_page_screen.dart';
import 'package:Portfolio_flutter/utility/util.dart';
import 'package:Portfolio_flutter/widgets/drawerWidget.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Widget> _screens = [
    const AccueilScreen(),
    const EventScreen(),
    const LieuPage(),
    MembeScreen(),
    const ProfilPageScreen(),
  ];

  int _selectedIndex = 0;

  @override
  void initState() {
    AwesomeNotifications().isNotificationAllowed().then((isAllowed) {
      if (!isAllowed) {
        AwesomeNotifications().requestPermissionToSendNotifications();
      }
    });
    super.initState();
    _checkLocationPermission();
  }

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    var bottomNaviationBarColor = theme.primaryColor;
    bool tablet = isTablet(context);
    return ZoomDrawer(
      style: DrawerStyle.defaultStyle,
      mainScreenTapClose: true,
      menuScreenWidth: MediaQuery.of(context).size.width * 0.65,
      moveMenuScreen: true,
      menuScreen: const DrawerScreen(),
      mainScreen: Scaffold(
        body: Stack(
          children: [
            _screens[_selectedIndex],
            Positioned(
              left: tablet ? getScreenWidth(context) / 2.5 : 20,
              right: tablet ? getScreenWidth(context) / 20 : 20,
              bottom: 20,
              child: Center(
                child: Container(
                  decoration: BoxDecoration(
                    color: bottomNaviationBarColor,
                    borderRadius: BorderRadius.circular(30.0),
                    border: Border.all(color: Colors.transparent, width: 3),
                  ),
                  child: CurvedNavigationBar(
                    animationCurve: Curves.fastOutSlowIn,
                    backgroundColor: Colors.transparent,
                    color: Colors.transparent,
                    buttonBackgroundColor: theme.dividerColor,
                    index: _selectedIndex,
                    height: tablet ? 60 : 50,
                    items: [
                      Icon(Icons.home, color: theme.hintColor),
                      Icon(Icons.calendar_month, color: theme.hintColor),
                      Icon(Icons.location_on, color: theme.hintColor),
                      Icon(Icons.people_outline_outlined,
                          color: theme.hintColor),
                      Icon(Icons.person, color: theme.hintColor),
                    ],
                    onTap: (index) {
                      setState(() {
                        _selectedIndex = index;
                      });
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
      borderRadius: 24.0,
      showShadow: true,
      angle: 0.0,
      slideWidth: MediaQuery.of(context).size.width * 0.65,
    );
  }

  Future<void> _checkLocationPermission() async {
    // Vérifier si les services de localisation sont activés
    bool isLocationServiceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!isLocationServiceEnabled) {
      _showLocationPermissionDialog();
      return;
    }
  }

  void _showLocationPermissionDialog() {
    Get.dialog(
      AlertDialog(
        backgroundColor: Theme.of(context).cardColor,
        title: const Text('Activer la localisation'),
        icon: Icon(
          Icons.location_on,
          size: 100,
          color: Colors.red.shade500,
        ),
        content: const Text(
            'Veuillez activer les services de localisation pour une meilleure expérience.'),
        actions: [
          TextButton(
            onPressed: () => Get.back(),
            child: Container(
              padding: const EdgeInsets.only(
                  left: 20, right: 20, top: 10, bottom: 10),
              decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(20),
                  ),
                  color: Colors.red.shade500),
              child: const Text('Annuler'),
            ),
          ),
          TextButton(
            onPressed: () async {
              await Geolocator.openLocationSettings();
              Get.back();
            },
            child: Container(
              padding: const EdgeInsets.only(
                  left: 20, right: 20, top: 10, bottom: 10),
              decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(20),
                  ),
                  color: Colors.green.shade500),
              child: const Text('Activer'),
            ),
          ),
        ],
      ),
    );
  }
}

class HomeController extends GetxController {
  var selectedIndex = 0.obs;
}
