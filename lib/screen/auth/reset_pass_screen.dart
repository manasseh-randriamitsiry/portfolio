import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:Portfolio_flutter/utility/util.dart';
import 'package:Portfolio_flutter/widgets/input_widget.dart';

import '../../widgets/btn_widget.dart';

class ResetPassScreen extends StatefulWidget {
  const ResetPassScreen({super.key});

  @override
  State<ResetPassScreen> createState() => _VerificationPageState();
}

class _VerificationPageState extends State<ResetPassScreen> {
  @override
  void initState() {
    super.initState();
  }

  final TextEditingController emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    double containerWidth = getContainerWidth(context);
    bool tablet = isTablet(context);
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color ?? Colors.black;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "reset_password".tr,
          style: TextStyle(fontSize: 20, color: textColor),
        ),
        centerTitle: true,
      ),
      body: Center(
        child: Stack(
          children: [
            SizedBox(
              width: tablet ? 600 : containerWidth,
              child: Column(
                children: [
                  const SizedBox(height: 50),
                  Text(
                    "reset_password_message".tr,
                    textAlign: TextAlign.center,
                    style: TextStyle(color: textColor),
                  ),
                  const SizedBox(height: 50),
                  InputWidget(
                    controller: emailController,
                    icon: Icons.email_outlined,
                    labelText: "enter_email".tr,
                    type: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 20),
                  Text(
                    "reset_password_hint".tr,
                    textAlign: TextAlign.center,
                    style: TextStyle(color: textColor),
                  ),
                  BtnWidget(
                    onTap: () {
                      if (emailController.text.trim().isNotEmpty) {
                        showAlertSuccessWidget(
                            context,
                            "success_email_sent_message".tr,
                            "hint_success_email_sent_message".tr);
                      }
                      if (kDebugMode) {
                        print("Send email");
                      }
                      // Send email
                    },
                    inputWidth: tablet ? 600 : containerWidth,
                    inputHeight: 60,
                    text: "send".tr,
                  ),
                  const SizedBox(
                    height: 50,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
