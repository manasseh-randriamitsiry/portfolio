import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../utility/util.dart';

class InputPasswordWidget extends StatefulWidget {
  const InputPasswordWidget({
    super.key,
    required this.lblText,
    this.errorText,
    this.controller,
  });

  final String lblText;
  final String? errorText;
  final TextEditingController? controller;

  @override
  State<InputPasswordWidget> createState() => _InputPasswordWidgetState();
}

class _InputPasswordWidgetState extends State<InputPasswordWidget> {
  bool _showPassword = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.primaryColor;
    final inputBorderColor = theme.hintColor;
    final hintColor = theme.hintColor;
    final errorColor = theme.hintColor;
    final textColor = theme.textTheme.bodyLarge?.color ?? Colors.black;
    bool tablet = isTablet(context);

    return Animate(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            controller: widget.controller,
            obscureText: !_showPassword,
            style: TextStyle(color: textColor),
            decoration: InputDecoration(
              labelText: widget.lblText,
              labelStyle: TextStyle(color: hintColor),
              prefixIcon: Icon(Icons.lock, color: primaryColor),
              suffixIcon: IconButton(
                icon: Icon(
                  _showPassword ? Icons.visibility : Icons.visibility_off,
                  color: primaryColor,
                ),
                onPressed: () {
                  setState(() {
                    _showPassword = !_showPassword;
                  });
                },
              ),
              contentPadding:
                  tablet ? const EdgeInsets.all(30) : const EdgeInsets.all(20),
              errorText: widget.errorText,
              errorStyle: TextStyle(color: errorColor),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: primaryColor),
                borderRadius: const BorderRadius.all(Radius.circular(0)),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: inputBorderColor),
                borderRadius: const BorderRadius.all(Radius.circular(10)),
              ),
            ),
          ),
        ],
      ),
    ).slideX(
      duration: const Duration(milliseconds: 500),
    );
  }
}
