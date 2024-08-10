import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/screen/auth/reset_pass_screen.dart';
import 'package:Portfolio_flutter/screen/auth/signup_screen.dart';
import 'package:Portfolio_flutter/widgets/btn_widget.dart';
import 'package:Portfolio_flutter/widgets/input_password_widget.dart';
import 'package:Portfolio_flutter/widgets/input_widget.dart';
import 'package:Portfolio_flutter/widgets/social_btn_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../controller/auth_controller.dart';
import '../../controller/theme_controller.dart';
import '../../utility/util.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthController _authController = Get.put(AuthController());
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final ThemeController _themeController = Get.put(ThemeController());
  final _switchValue = false.obs;
  final _themeswitchValue = false.obs;

  @override
  Widget build(BuildContext context) {
    Future<void> completeSetup() async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setBool('isFirstUse', false);
    }

    completeSetup();

    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color ?? Colors.black;
    final backgroundColor = theme.scaffoldBackgroundColor;
    bool tablet = isTablet(context);

    double screenWidth = getScreenWidth(context);
    double screenHeight = getScreenHeight(context);
    double containerWidth = getContainerWidth(context);

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: Text(
          "login_message".tr,
          style: TextStyle(fontSize: 25, color: textColor),
        ),
        leading: IconButton(
          onPressed: () {
            showLanguageDialog(context);
          },
          icon: Icon(Icons.language),
        ),
        centerTitle: true,
        backgroundColor: backgroundColor,
        elevation: 0,
        actions: [
          Obx(
            () => Switch(
              value: _themeswitchValue.value,
              onChanged: (value) {
                _themeswitchValue.value = value;
                _themeController.toggleTheme(); // Toggle the theme
              },
              activeColor: theme.colorScheme.secondary.withOpacity(0.5),
              activeTrackColor: theme.primaryColor.withOpacity(0.5),
              thumbIcon: WidgetStateProperty.resolveWith<Icon?>(
                (Set<WidgetState> states) {
                  if (_themeswitchValue.value) {
                    return const Icon(Icons.nights_stay_rounded,
                        color: Colors.blue, size: 18);
                  } else {
                    return const Icon(Icons.sunny,
                        color: Colors.orange, size: 18);
                  }
                },
              ),
            ),
          )
        ],
      ),
      body: Center(
        child: Container(
          width: tablet ? 500 : containerWidth,
          child: Stack(
            children: [
              SizedBox(
                width: containerWidth,
                child: Column(
                  children: [
                    SizedBox(height: screenHeight / 20),
                    Text(
                      "login_hint_message".tr,
                      textAlign: TextAlign.center,
                      style: TextStyle(color: textColor),
                    ),
                    SizedBox(height: screenHeight / 40),
                    InputWidget(
                      icon: Icons.email_outlined,
                      labelText: 'enter_id'.tr,
                      controller: _usernameController,
                      type: TextInputType.text,
                    ),
                    const SizedBox(height: 15),
                    InputPasswordWidget(
                      lblText: "enter_password".tr,
                      controller: _passwordController,
                    ),
                    const SizedBox(height: 15),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Obx(
                              () => Switch(
                                value: _switchValue.value,
                                onChanged: (value) {},
                              ),
                            ),
                            Text("remember_me".tr,
                                style: TextStyle(color: textColor)),
                          ],
                        ),
                        TextButton(
                          onPressed: () {
                            Get.to(() => const ResetPassScreen());
                          },
                          child: Text(
                            "forgot_password".tr,
                            style: TextStyle(color: theme.primaryColor),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: screenHeight / 20),
                    BtnWidget(
                      onTap: () {
                        if (_usernameController.text.trim().isEmpty ||
                            _passwordController.text.trim().isEmpty) {
                          showAlertErrorWidget(
                              context, "error".tr, "fill_fields".tr);
                        } else {
                          try {
                            _authController.login(
                              _usernameController.text,
                              _passwordController.text,
                            );
                          } catch (e) {
                            if (kDebugMode) {
                              print(e.toString());
                            }
                          }
                        }
                      },
                      inputWidth: containerWidth,
                      inputHeight: screenHeight / 14,
                      text: "login".toUpperCase().tr,
                    ),
                    SizedBox(height: screenHeight / 30),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          width: isTablet(context)
                              ? screenWidth / 8
                              : 2 * screenWidth / 8,
                          color: textColor.withOpacity(0.2),
                          height: 2,
                        ),
                        Text("continue_with".tr,
                            style: TextStyle(color: textColor)),
                        Container(
                          width: isTablet(context)
                              ? screenWidth / 8
                              : 2 * screenWidth / 8,
                          color: textColor.withOpacity(0.2),
                          height: 2,
                        ),
                      ],
                    ),
                    SizedBox(height: screenHeight / 30),
                    SizedBox(
                      width: containerWidth - 40,
                      child: const SocialBtnWidget(),
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
              Positioned(
                top: screenHeight - 115,
                left: 0,
                right: 0,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text("dont_have_account".tr,
                        style: TextStyle(color: textColor)),
                    GestureDetector(
                      onTap: () {
                        Get.to(() => SignupScreen(),
                            transition: Transition.rightToLeft);
                      },
                      child: Text(
                        "register_here".tr,
                        style: TextStyle(color: theme.primaryColor),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
