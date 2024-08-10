import 'dart:math';

import 'package:filter_list/filter_list.dart';
import 'package:flutter/material.dart';

import '../../utility/util.dart';
import '../../widgets/drawerWidget.dart';
import '../../widgets/head_actions_widget.dart';
import '../../widgets/listeSortieWidget.dart';

class EventScreen extends StatefulWidget {
  const EventScreen({super.key});

  @override
  _EventScreenState createState() => _EventScreenState();
}

class _EventScreenState extends State<EventScreen> {
  List<String> filterOptions = ['Sports', 'Music', 'Food', 'Travel', 'Gaming'];
  List<String> selectedFilters = [];

  // List of events
  List<Map<String, String>> sorties = [
    {
      'title': 'Soiree FIFA',
      'time': '12h à 18H',
      'dateLeft': '07 Octobre',
      'dateRight': 'Sada Mayotte',
      'location': 'MALIKI',
      'occupied': '5/10',
      'category': 'Gaming',
    },
    {
      'title': 'Concert de Jazz',
      'time': '20h à 23H',
      'dateLeft': '10 Octobre',
      'dateRight': 'Mamoudzou',
      'location': 'Jazz Club',
      'occupied': '30/50',
      'category': 'Music',
    },
    {
      'title': 'Course de Marathon',
      'time': '08h à 12H',
      'dateLeft': '15 Octobre',
      'dateRight': 'Petite-Terre',
      'location': 'Stade Municipal',
      'occupied': '20/100',
      'category': 'Sports',
    },
  ];

  // List to hold random colors for each event
  List<Color> eventColors = [];

  @override
  void initState() {
    super.initState();
    // Generate random colors when the widget is initialized
    generateRandomColors();
  }

  // Method to generate a random color
  void generateRandomColors() {
    final random = Random();
    eventColors = List.generate(sorties.length, (index) {
      return Color.fromARGB(
        200,
        random.nextInt(256), // Random value for red
        random.nextInt(256), // Random value for green
        random.nextInt(256), // Random value for blue
      );
    });
  }

  void _openFilterDialog() async {
    await FilterListDialog.display<String>(
      context,
      listData: filterOptions,
      selectedListData: selectedFilters,
      choiceChipLabel: (item) => item,
      validateSelectedItem: (list, val) => list!.contains(val),
      onItemSearch: (filter, query) {
        return filter.toLowerCase().contains(query.toLowerCase());
      },
      onApplyButtonClick: (list) {
        setState(() {
          selectedFilters = List.from(list ?? []);
        });
        Navigator.pop(context);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    List<Map<String, String>> filteredSorties = sorties.where((sortie) {
      if (selectedFilters.isEmpty) {
        return true;
      }
      return selectedFilters.contains(sortie['category']);
    }).toList();

    var theme = Theme.of(context);
    var borderColor = theme.hintColor.withOpacity(0.3);
    var focusedBorderColor = theme.primaryColor.withOpacity(0.7);
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
                  SizedBox(
                    height: getScreenHeight(context) / 20,
                  ),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      headActionsWidget(),
                    ],
                  ),
                  EventWidget(
                      screenHeight: screenHeight,
                      theme: theme,
                      focusedBorderColor: focusedBorderColor,
                      borderColor: borderColor,
                      filteredSorties: filteredSorties,
                      eventColors: eventColors),
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
          'Evenements',
          style: TextStyle(
            color: Theme.of(context).textTheme.bodyLarge?.color,
          ),
        ),
        actions: [
          IconButton(
            onPressed: _openFilterDialog,
            icon: const Icon(Icons.filter_alt_outlined),
          ),
        ],
        centerTitle: true,
      ),
      body: EventWidget(
          screenHeight: screenHeight,
          theme: theme,
          focusedBorderColor: focusedBorderColor,
          borderColor: borderColor,
          filteredSorties: filteredSorties,
          eventColors: eventColors),
    );
  }
}

class EventWidget extends StatelessWidget {
  const EventWidget({
    super.key,
    required this.screenHeight,
    required this.theme,
    required this.focusedBorderColor,
    required this.borderColor,
    required this.filteredSorties,
    required this.eventColors,
  });

  final double screenHeight;
  final ThemeData theme;
  final Color focusedBorderColor;
  final Color borderColor;
  final List<Map<String, String>> filteredSorties;
  final List<Color> eventColors;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const ListItemsTop(),
          Container(
            margin: const EdgeInsets.all(20),
            height: screenHeight / 10,
            child: TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(
                  Icons.search,
                  color: theme.iconTheme.color,
                ),
                hintText: "Trouver une sortie",
                hintStyle: TextStyle(
                  color: theme.hintColor,
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: focusedBorderColor),
                  borderRadius: const BorderRadius.all(
                    Radius.circular(30),
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: borderColor),
                  borderRadius: const BorderRadius.all(
                    Radius.circular(30),
                  ),
                ),
              ),
            ),
          ),
          ...filteredSorties.asMap().entries.map((entry) {
            int index = entry.key;
            Map<String, String> sortie = entry.value;
            return ListSortieWidget(
              screenHeight: screenHeight,
              backgroundColor: eventColors[index],
              icon: Icons.event,
              title: sortie['title']!,
              time: sortie['time']!,
              dateLeft: sortie['dateLeft']!,
              dateRight: sortie['dateRight']!,
              location: sortie['location']!,
              occupied: sortie['occupied']!,
            );
          }),
        ],
      ),
    );
  }
}

class ListItemsTop extends StatelessWidget {
  const ListItemsTop({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    var iconBorderColor = theme.hintColor.withOpacity(0.2);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        IconButton(
          onPressed: () {},
          icon: const Icon(
            Icons.refresh,
            size: 40,
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(100),
              ),
              color: iconBorderColor,
            ),
            child: const Icon(
              Icons.security,
              size: 15,
            ),
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(100),
              ),
              color: iconBorderColor,
            ),
            child: const Icon(
              Icons.sports_basketball_sharp,
              size: 15,
            ),
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(100),
              ),
              color: iconBorderColor,
            ),
            child: const Icon(
              Icons.music_note_outlined,
              size: 15,
            ),
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(100),
              ),
              color: iconBorderColor,
            ),
            child: const Icon(
              Icons.flight_takeoff_rounded,
              size: 15,
            ),
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(100),
              ),
              color: iconBorderColor,
            ),
            child: const Icon(
              Icons.local_dining_outlined,
              size: 15,
            ),
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: const Icon(
            Icons.filter_none,
            color: Colors.transparent,
          ),
        ),
      ],
    );
  }
}
