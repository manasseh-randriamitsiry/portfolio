import 'package:animations/animations.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:Portfolio_flutter/utility/util.dart';

import '../sortie/sortie_screen.dart';

final List<Map<String, String>> events = [
  {
    'title': 'Basic Plan',
    'plan': '4,49€/semaine ( 10% réduction annuelle)',
    'Avantages':
        'Création de sortie jusqu’à 5 par mois,Nombre de personnes illimité sortie + Possibilité sortie payante et paiement en ligne + Envoi création newsletter personnalisé + Nombre illimité de contacts ( 100) + Nombre d’envoi d’email par jour 200 + max par mois 5000 emails',
    'image_url':
        'https://img.capital.com/imgs/articles/662x308x0/shutterstock_256676086-4-.jpg',
  },
  {
    'title': 'Gold Plan',
    'plan': '14,99€/semaine ( 10% réduction annuelle)',
    'Avantages':
        'comme offre premium + Nombre de création de sortie illimitée + newsletter 1500 contacts + newsletter 15,000 emails/mois',
    'image_url':
        'https://paytmblogcdn.paytm.com/wp-content/uploads/2024/01/1_Investment_Gold-Forever-an-Investment-Choice-option-1.webp',
  },
  {
    'title': 'Premium Plan',
    'plan': '39£/mois',
    'Avantages': 'liste des avantages',
    'image_url':
        'https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2024/04/042324_ec_lab-diamonds_feat.jpg?fit=1030%2C580&ssl=1',
  },
];

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Liste des abonnements'),
      ),
      body: ListView(
        shrinkWrap: true,
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: Container(
              child: Text(
                textAlign: TextAlign.center,
                "Veuillez choisir un plan pour profiter des avantages",
                style: TextStyle(
                  fontSize: 20,
                  color: getTheme(context).hintColor,
                ),
              ),
            ),
          ),
          _buildEventCarousel(context),
        ],
      ),
    );
  }
}

Widget _buildEventCarousel(BuildContext context) {
  double screenHeight = MediaQuery.of(context).size.height;
  return CarouselSlider.builder(
    itemCount: events.length,
    options: CarouselOptions(
      height: 2 * screenHeight / 3,
      viewportFraction: 0.9,
      initialPage: 1,
      enableInfiniteScroll: true,
      autoPlay: false,
      pauseAutoPlayOnTouch: true,
      autoPlayInterval: const Duration(seconds: 5),
      clipBehavior: Clip.antiAliasWithSaveLayer,
      animateToClosest: true,
      enlargeFactor: BorderSide.strokeAlignOutside,
      enlargeStrategy: CenterPageEnlargeStrategy.zoom,
      pauseAutoPlayInFiniteScroll: true,
      pauseAutoPlayOnManualNavigate: true,
      autoPlayCurve: Curves.easeIn,
      enlargeCenterPage: true,
    ),
    itemBuilder: (context, index, realIndex) {
      double scaleFactor = 2;
      if (index == 0 || index == 2) {
        scaleFactor = 0.9;
      }
      return _buildEventSection(
        context,
        event: events[index],
        scaleFactor: scaleFactor,
      );
    },
  );
}

Widget _buildEventSection(BuildContext context,
    {required Map<String, String> event, double scaleFactor = 2.0}) {
  return FractionallySizedBox(
    widthFactor: 0.92,
    child: SubscriptionsWidget(
      title: event['title']!,
      plan: event['plan']!,
      avantage: event['Avantages']!,
      image_url: event['image_url']!,
    ),
  );
}

class SubscriptionsWidget extends StatelessWidget {
  final String title;
  final String plan;
  final String avantage;
  final String image_url;

  const SubscriptionsWidget({
    super.key,
    required this.title,
    required this.plan,
    required this.avantage,
    required this.image_url,
  });

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    var backgroundColor = theme.dividerColor.withOpacity(0.8);
    var boxShadowColor = theme.hintColor.withOpacity(0.8);
    var textColor = theme.hintColor;
    var textThemeColor = theme.textTheme.bodyLarge?.color;
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    double containerWidth = 4 * screenWidth / 5;
    double containerHeight = screenHeight / 2;

    void _choosePaymentMethod() {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          String _selectedPaymentMethod =
              "Credit Card"; // Default payment method
          return AlertDialog(
            title: Text(
              "Choisir un moyen de paiement",
              style: TextStyle(color: textColor),
              textAlign: TextAlign.center,
            ),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                RadioListTile(
                  title: Text(
                    "Credit Card",
                    style: TextStyle(color: textColor),
                  ),
                  value: "Credit Card",
                  groupValue: _selectedPaymentMethod,
                  onChanged: (String? value) {
                    _selectedPaymentMethod = value!;
                    Navigator.of(context).pop();
                  },
                ),
                RadioListTile(
                  title: Text(
                    "PayPal",
                    style: TextStyle(color: textColor),
                  ),
                  value: "PayPal",
                  groupValue: _selectedPaymentMethod,
                  onChanged: (String? value) {
                    _selectedPaymentMethod = value!;
                    Navigator.of(context).pop();
                  },
                ),
                RadioListTile(
                  title: Text(
                    "Google Pay",
                    style: TextStyle(color: textColor),
                  ),
                  value: "Google Pay",
                  groupValue: _selectedPaymentMethod,
                  onChanged: (String? value) {
                    _selectedPaymentMethod = value!;
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          );
        },
      );
    }

    return SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 16.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: backgroundColor,
          boxShadow: [
            BoxShadow(color: boxShadowColor.withOpacity(0.3), blurRadius: 4)
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              height: containerHeight / 3,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.blue,
              ),
              child: Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(20),
                        topLeft: Radius.circular(20)),
                    child: OpenContainer(
                      closedBuilder: (context, openContainer) {
                        return GestureDetector(
                          onTap: openContainer,
                          child: CachedNetworkImage(
                            imageUrl: image_url,
                            fit: BoxFit.cover,
                            width: double.infinity,
                            height: double.infinity,
                            placeholder: (context, url) =>
                                const CircularProgressIndicator(),
                            errorWidget: (context, url, error) =>
                                const Icon(Icons.error),
                          ),
                        );
                      },
                      openBuilder: (context, closeContainer) {
                        return const SortieScreen();
                      },
                      transitionDuration: const Duration(milliseconds: 500),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Container(
              width: containerWidth,
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                // Align text to start
                children: [
                  Text(
                    title,
                    style: TextStyle(fontSize: 20, color: textThemeColor),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      const Icon(
                        Icons.subscriptions_outlined,
                        color: Colors.deepOrange,
                        size: 15,
                      ),
                      const SizedBox(width: 5),
                      Text(
                        plan,
                        style: TextStyle(fontSize: 12, color: textThemeColor),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    // Align text to start
                    children: [
                      const Icon(
                        Icons.gpp_good_rounded,
                        color: Colors.deepOrange,
                        size: 15,
                      ),
                      const SizedBox(width: 5),
                      Expanded(
                        child: Text(
                          avantage,
                          style: TextStyle(fontSize: 12, color: textThemeColor),
                          maxLines: null, // Allow unlimited lines
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10), // Add space before button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: _choosePaymentMethod,
                        child: Container(
                          width: containerWidth / 4,
                          height: containerHeight / 8,
                          decoration: const BoxDecoration(
                            color: Colors.blue,
                            borderRadius: BorderRadius.all(Radius.circular(15)),
                          ),
                          child: const Center(
                            child: Text(
                              "Activer",
                              style:
                                  TextStyle(fontSize: 12, color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
