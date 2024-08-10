import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:liquid_swipe/liquid_swipe.dart';
import 'package:Portfolio_flutter/services/api_service.dart';
import 'package:Portfolio_flutter/utility/util.dart';

import '../auth/login_screen.dart';

class SplashScreen1 extends StatelessWidget {
  static const TextStyle greyStyle =
      TextStyle(fontSize: 40.0, color: Colors.grey);
  static const TextStyle whiteStyle =
      TextStyle(fontSize: 40.0, color: Colors.white);

  static const TextStyle boldStyle = TextStyle(
    fontSize: 50.0,
    color: Colors.black,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle descriptionGreyStyle = TextStyle(
    color: Colors.grey,
    fontSize: 20.0,
  );

  static const TextStyle descriptionWhiteStyle = TextStyle(
    color: Colors.white,
    fontSize: 20.0,
  );

  final ApiService apiService = Get.put(ApiService());

  SplashScreen1({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    bool _isTablet = isTablet(context);
    final pages = [
      Container(
        color: Colors.lightBlue,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            SizedBox(
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              child: SvgPicture.asset(
                "assets/images/language.svg",
                alignment: Alignment.center,
                fit: BoxFit.contain,
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: 150),
              child: Container(
                height: 50,
                width: _isTablet
                    ? getScreenWidth(context) / 2
                    : getScreenWidth(context),
                padding: EdgeInsets.symmetric(horizontal: 30.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text('language_hint'.tr),
                    const LanguageWidget(),
                    Icon(
                      Icons.flag,
                      size: 30,
                    ),
                  ],
                ),
              ),
            ),
            const dotsWidget(
              active: 0,
              number: 4,
            ),
            const SkipWidget()
          ],
        ),
      ),
      Container(
        color: Colors.yellowAccent.shade700,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            SizedBox(
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              child: SvgPicture.asset(
                "assets/images/undraw_mello_otq1.svg",
                alignment: Alignment.center,
                fit: BoxFit.contain,
              ),
            ),
            Container(
              height: 200,
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "splash_title1".tr,
                    style: boldStyle,
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                    "splash_subtitle1".tr,
                    style: descriptionGreyStyle,
                  ),
                ],
              ),
            ),
            const dotsWidget(
              active: 1,
              number: 4,
            ),
            const SkipWidget()
          ],
        ),
      ),
      Container(
        color: const Color(0xFF55006c),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            SizedBox(
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              child: SvgPicture.asset(
                "assets/images/undraw_video_game_night_8h8m.svg",
                alignment: Alignment.center,
                fit: BoxFit.contain,
              ),
            ),
            Container(
              height: 200,
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "splash_title2".tr,
                    style: boldStyle,
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                    "splash_subtitle2".tr,
                    style: descriptionWhiteStyle,
                  ),
                ],
              ),
            ),
            const dotsWidget(
              active: 2,
              number: 4,
            ),
            const SkipWidget()
          ],
        ),
      ),
      Container(
        color: Colors.green,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            SizedBox(
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              child: SvgPicture.asset(
                "assets/images/undraw_virtual_reality_re_yg8i.svg",
                alignment: Alignment.center,
                fit: BoxFit.contain,
              ),
            ),
            Container(
              height: 200,
              padding: EdgeInsets.symmetric(horizontal: 50.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "splash_title3".tr,
                    style: boldStyle,
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                    "splash_subtitle3".tr,
                    style: descriptionWhiteStyle,
                  ),
                ],
              ),
            ),
            const dotsWidget(
              active: 3,
              number: 4,
            ),
            const SkipWidget()
          ],
        ),
      ),
      Container(
        color: Colors.transparent,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            SizedBox(
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              child: SvgPicture.asset(
                "assets/images/undraw_basketball_re_7701.svg",
                alignment: Alignment.center,
                fit: BoxFit.contain,
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "Bonjour",
                    style: boldStyle,
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                    "Hola",
                    style: descriptionWhiteStyle,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ];

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: LiquidSwipe(
          pages: pages,
          enableLoop: false,
          fullTransitionValue: 300,
          slideIconWidget: const Icon(Icons.navigate_next),
          waveType: WaveType.liquidReveal,
          positionSlideIcon: 0.5,
          onPageChangeCallback: (activePageIndex) {
            if (activePageIndex == pages.length - 1) {
              Get.off(const LoginScreen());
            }
          },
        ),
      ),
    );
  }
}

class dotsWidget extends StatelessWidget {
  final int active;
  final int number;
  const dotsWidget({
    super.key,
    required this.active,
    required this.number,
  });

  @override
  Widget build(BuildContext context) {
    return DotsIndicator(
      dotsCount: number,
      position: active,
      decorator: DotsDecorator(
        activeColor: Colors.blue, // Customize colors
        size: const Size.square(9.0),
        activeSize: const Size(18.0, 9.0),
        activeShape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
      ),
    );
  }
}

class SkipWidget extends StatelessWidget {
  const SkipWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Text(
            "skip".tr,
            style: TextStyle(color: Colors.white),
          ),
          SizedBox(
            width: 10,
          ),
          Icon(
            Icons.fast_forward,
            size: 30,
            color: Colors.white,
          ),
          SizedBox(
            width: 10,
          )
        ],
      ),
      onTap: () {
        Get.off(const LoginScreen());
      },
    );
  }
}
