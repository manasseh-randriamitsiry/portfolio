import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/controller/auth_controller.dart';

import '../../utility/util.dart';
import '../../widgets/btn_widget.dart';
import '../../widgets/input_password_widget.dart';
import '../../widgets/input_widget.dart';
import '../../widgets/social_btn_widget.dart';
import 'login_screen.dart';

class SignupScreen extends StatelessWidget {
  final AuthController _authController = Get.put(AuthController());
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController1 = TextEditingController();
  final TextEditingController _passwordController2 = TextEditingController();

  SignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    double containerWidth = screenWidth - 50;

    // colors
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color ?? Colors.black;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: Text(
          "signup_message".tr,
          style: TextStyle(fontSize: 25, color: textColor),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {
              showLanguageDialog(context);
            },
            icon: Icon(Icons.language),
          ),
        ],
      ),
      body: Center(
        child: Container(
          width: isTablet(context) ? 500 : containerWidth,
          child: Stack(
            children: [
              SizedBox(
                width: containerWidth,
                child: Column(
                  children: [
                    SizedBox(height: screenHeight / 40),
                    Text(
                      "signup_hint_message".tr,
                      style: TextStyle(color: textColor),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: screenHeight / 40),
                    InputWidget(
                      icon: Icons.person_outline,
                      labelText: 'enter_pseudo'.tr,
                      controller: _usernameController,
                      type: TextInputType.text,
                    ),
                    const SizedBox(height: 10),
                    InputWidget(
                      icon: Icons.email_outlined,
                      labelText: 'enter_pseudo'.tr,
                      controller: _emailController,
                      type: TextInputType.emailAddress,
                    ),
                    const SizedBox(height: 10),
                    InputPasswordWidget(
                      lblText: "enter_password".tr,
                      controller: _passwordController1,
                    ),
                    const SizedBox(height: 10),
                    InputPasswordWidget(
                      lblText: "enter_password_confirm".tr,
                      controller: _passwordController2,
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    BtnWidget(
                      onTap: () {
                        if (_usernameController.text.trim().isEmpty ||
                            _passwordController1.text.trim().isEmpty ||
                            _passwordController2.text.trim().isEmpty ||
                            _emailController.text.trim().isEmpty) {
                          showAlertErrorWidget(
                              context, "error".tr, "fill_fields".tr);
                        } else {
                          try {
                            _authController.signup(
                              _usernameController.text,
                              _passwordController1.text,
                              _passwordController2.text,
                              _emailController.text,
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
                      text: "register".toUpperCase().tr,
                    ),
                    SizedBox(
                      height: screenHeight / 30,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          width: isTablet(context)
                              ? screenWidth / 8
                              : 2 * screenWidth / 8,
                          color: Colors.black.withOpacity(0.2),
                          height: 2,
                        ),
                        Text(
                          "continue_with".tr,
                          style: TextStyle(color: textColor),
                        ),
                        Container(
                          width: isTablet(context)
                              ? screenWidth / 8
                              : 2 * screenWidth / 8,
                          color: Colors.black.withOpacity(0.2),
                          height: 2,
                        ),
                      ],
                    ),
                    SizedBox(
                      height: screenHeight / 20,
                    ),
                    SizedBox(
                      width: containerWidth - 40,
                      child: const SocialBtnWidget(),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
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
                    Text(
                      "already_have_account".tr,
                      style: TextStyle(color: textColor),
                    ),
                    GestureDetector(
                      onTap: () {},
                      child: GestureDetector(
                        onTap: () {
                          Navigator.pop(context); // Close drawer
                          Navigator.push(
                            context,
                            PageRouteBuilder(
                              pageBuilder:
                                  (context, animation, secondaryAnimation) =>
                                      const LoginScreen(),
                              transitionsBuilder: (context, animation,
                                  secondaryAnimation, child) {
                                return FadeTransition(
                                    opacity: animation, child: child);
                              },
                            ),
                          );
                        },
                        child: Text(
                          "login_here".tr,
                          style: TextStyle(color: Colors.orange),
                        ),
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
