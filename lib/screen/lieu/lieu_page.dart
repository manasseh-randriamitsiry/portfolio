import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../../utility/util.dart';
import '../../widgets/drawerWidget.dart';

class LieuPage extends StatefulWidget {
  const LieuPage({super.key});

  @override
  _LieuPageState createState() => _LieuPageState();
}

class _LieuPageState extends State<LieuPage> {
  late GoogleMapController mapController;

  final LatLng _center = const LatLng(37.7749, -122.4194);

  final Set<Marker> _markers = {
    Marker(
      markerId: const MarkerId('music_note'),
      position: const LatLng(37.7749, -122.4194),
      infoWindow: const InfoWindow(title: 'Music Note'),
      icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
    ),
    Marker(
      markerId: const MarkerId('local_bar'),
      position: const LatLng(37.7829, -122.4324),
      infoWindow: const InfoWindow(title: 'Local Bar'),
      icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueOrange),
    ),
  };

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    var textColor = theme.textTheme.bodyLarge?.color ?? Colors.black;
    bool tablet = isTablet(context);
    if (tablet) {
      return Scaffold(
        body: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(
              width: 5,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 50,
                ),
                SizedBox(
                  width: getScreenWidth(context) / 3,
                  height: getContainerHeight(context) - 50,
                  child: const DrawerScreen(),
                ),
              ],
            ),
            SizedBox(
              width: (2 * getScreenWidth(context) / 3) - 10,
              height: getScreenHeight(context),
              child: Column(
                children: [
                  Container(
                    child: GoogleMap(
                      onMapCreated: _onMapCreated,
                      initialCameraPosition: CameraPosition(
                        target: _center,
                        zoom: 13.0,
                      ),
                      markers: _markers,
                    ),
                    width: 500,
                    height: 500,
                  ),
                  Container(
                    color: Colors.transparent,
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Designers Meetup 2022',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            // Implement join functionality here
                          },
                          child: const Text(
                            'REJOINDRE',
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(
            Icons.menu,
            color: textColor,
          ),
          onPressed: () {
            openDrawer(context);
          },
        ),
        title: Text(
          'Party Locations',
          style: TextStyle(
            color: Theme.of(context).textTheme.bodyLarge?.color,
          ),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // Implement search functionality here
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // Implement settings functionality here
            },
          ),
        ],
      ),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: _center,
          zoom: 13.0,
        ),
        markers: _markers,
      ),
      bottomSheet: Container(
        color: Colors.transparent,
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Designers Meetup 2022',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            ElevatedButton(
              onPressed: () {
                // Implement join functionality here
              },
              child: const Text(
                'REJOINDRE',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() => runApp(const MaterialApp(
      home: LieuPage(),
    ));
