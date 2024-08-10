import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../screen/user/profil_page_screen.dart';
import '../utility/util.dart';

class headActionsWidget extends StatelessWidget {
  const headActionsWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          icon: const Icon(Icons.message_outlined),
          iconSize: isTablet(context) ? 40 : 25,
          onPressed: () {},
        ),
        IconButton(
          icon: const Icon(Icons.notifications),
          iconSize: isTablet(context) ? 40 : 25,
          onPressed: () {},
        ),
        IconButton(
          icon: const Icon(Icons.search),
          iconSize: isTablet(context) ? 40 : 25,
          onPressed: () {},
        ),
        SizedBox(
          width: isTablet(context) ? 40 : 25,
          height: isTablet(context) ? 40 : 25,
          child: GestureDetector(
            child: CircleAvatar(
              backgroundImage: Image.network(
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcxU00aT_8732RpJ6wVOf9zsgT4kA2UBlxg&s')
                  .image,
              radius: 30,
            ),
            onTap: () {
              Get.to(const ProfilPageScreen());
            },
          ),
        ),
        SizedBox(
          width: 10,
        )
      ],
    );
  }
}
